const getMissingFields = (attr) => {
  const fields = ['email', 'firstName', 'lastName', 'image', 'password'];
  return fields.filter((f) => !(f in attr) || !attr[f]);
};

const handler = (event) => {
  const { data } = JSON.parse(event.body);

  const { attributes } = data;

  const missingFields = getMissingFields(attributes);

  if (missingFields.length) {
    // TODO: send home errors
  }

  /**
   * TODO:
   * 1. Hash password
   * 2. Create user in fauna
   * 3. Return user resource
   */
  return Promise.resolve({
    statusCode: 200,
  });
};
