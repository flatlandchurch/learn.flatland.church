const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const COOKIE_SECRET = process.env.COOKIE_SECRET;

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
  } else {
    const token = cookie.parse(cookies)['learn-token'];
    const [err] = safelyVerify(token);
    if (err) {
      response.statusCode = 400;
    }
  }

  return Promise.resolve(response);
};

exports.handler = handler;
