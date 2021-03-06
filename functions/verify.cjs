const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const fauna = require('faunadb');

const COOKIE_SECRET = process.env.COOKIE_SECRET;

const q = fauna.query;
const client = new fauna.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

const safelyVerify = (token) => {
  try {
    return [null, jwt.verify(token, COOKIE_SECRET)];
  } catch (e) {
    return [e, null];
  }
};

const handler = async (event) => {
  const { cookie: cookies } = event.headers;

  const response = {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };

  if (!cookies) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      errors: [
        {
          status: 400,
          code: 'NoCookieError',
        },
      ],
    });
    return Promise.resolve(response);
  }

  const token = cookie.parse(cookies)['learn-token'];
  const [err, data] = safelyVerify(token);
  if (err) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      errors: [
        {
          status: 400,
          code: 'InvalidTokenError',
        },
      ],
    });
    return Promise.resolve(response);
  }

  const { id } = data;
  const result = await client.query(q.Get(q.Ref(q.Collection('users'), id)));
  const { password, ...attributes } = result.data;

  response.body = JSON.stringify({
    data: {
      type: 'user',
      id,
      attributes,
    },
  });

  return Promise.resolve(response);
};

exports.handler = handler;
