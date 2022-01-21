const { pbkdf2 } = require('crypto');
const { promisify } = require('util');
const fauna = require('faunadb');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const SALT = process.env.SALT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const q = fauna.query;
const client = new fauna.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

const hash = promisify(pbkdf2);

const catchify = (p) =>
  Promise.resolve(p).then(
    (d) => [null, d],
    (e) => [e, null],
  );

const handler = async (event) => {
  const { data } = JSON.parse(event.body);
  const { attributes } = data;

  const [err, result] = await catchify(
    client.query(q.Get(q.Match(q.Index('user_email'), attributes.email))),
  );

  if (err) {
    return Promise.resolve({
      statusCode: 404,
      body: JSON.stringify({
        errors: [
          {
            status: 404,
            code: 'UserNotFoundError',
          },
        ],
      }),
    });
  }

  const key = await hash(attributes.password, SALT, 5000, 32, 'sha512');
  if (key.toString('hex') !== result.data.password) {
    return Promise.resolve({
      statusCode: 401,
      body: JSON.stringify({
        errors: [
          {
            status: 401,
            code: 'InvalidPasswordError',
          },
        ],
      }),
    });
  }

  const { password, ...attr } = result.data;
  const cookieToken = await jwt.sign(
    {
      id: result.ref.toJSON()['@ref'].id,
    },
    COOKIE_SECRET,
    { expiresIn: 60 * 60 * 24 * 30 * 6 },
  );

  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      data: {
        type: 'user',
        id: result.ref.toJSON()['@ref'].id,
        attributes: attr,
      },
    }),
    headers: {
      'set-cookie': cookie.serialize('learn-token', cookieToken, {
        maxAge: 60 * 60 * 24 * 30 * 6, // ~6 months
        httpOnly: true,
      }),
    },
  });
};

exports.handler = handler;
