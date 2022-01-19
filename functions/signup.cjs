const fauna = require('faunadb');
const { pbkdf2 } = require('crypto');
const { promisify } = require('util');

const hash = promisify(pbkdf2);

const SALT = process.env.SALT;

const getMissingFields = (attr) => {
  const fields = ['email', 'firstName', 'lastName', 'password'];
  return fields.filter((f) => !(f in attr) || !attr[f]);
};

const q = fauna.query;
const client = new fauna.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

const catchify = (p) =>
  Promise.resolve(p).then(
    (d) => [null, d],
    (e) => [e, null],
  );

const handler = async (event) => {
  const { data } = JSON.parse(event.body);

  const { attributes } = data;

  const missingFields = getMissingFields(attributes);

  if (missingFields.length) {
    return Promise.resolve({
      statusCode: 400,
      body: JSON.stringify({
        errors: missingFields.map((f) => ({
          status: 400,
          code: 'MissingParameterError',
          details: `Required field "${f}" is missing from data.attributes.`,
        })),
      }),
    });
  }

  const [, existingUser] = await catchify(
    client.query(q.Get(q.Match(q.Index('user_email'), attributes.email))),
  );

  if (existingUser) {
    return Promise.resolve({
      statusCode: 403,
      body: JSON.stringify({
        errors: [
          {
            status: 403,
            code: 'UserExistsError',
          },
        ],
      }),
    });
  }

  const { password, ...rest } = attributes;
  const key = await hash(password, SALT, 5000, 32, 'sha512');
  const payload = {
    password: key.toString('hex'),
    isAdmin: false,
    ...rest,
  };

  const result = await client.query(q.Create(q.Collection('users'), { data: payload }));

  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      data: {
        type: 'user',
        id: result.ref.toJSON()['@ref'].id,
        attributes: {
          ...rest,
          isAdmin: false,
        },
      },
    }),
  });
};

exports.handler = handler;
