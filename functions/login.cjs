const { pbkdf2 } = require('crypto');
const { promisify } = require('util');

const hash = promisify(pbkdf2);

const SALT = process.env.SALT;

const handler = async (event) => {
  const { data } = JSON.parse(event.body);
  const { id, attributes } = data;

  /**
   * TODO:
   * 1. Fetch user from Fauna
   * 2. Compare keys
   * 3. Error handling
   * 4. Success handling (cookie setting)
   * 5. Return user resource
   */

  const key = await hash(attributes.password, SALT, 5000, 32, 'sha512');

  console.log(key.toString('hex'));

  return Promise.resolve({
    statusCode: 200,
  });
};

exports.handler = handler;
