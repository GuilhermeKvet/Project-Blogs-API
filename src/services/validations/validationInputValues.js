const { newUserSchema } = require('./schemas');

const validateUser = (displayName, email, password, image) => {
  const { error } = newUserSchema.validate({ displayName, email, password, image });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateUser,
};