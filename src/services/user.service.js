const { User } = require('../models');
const { validateUser } = require('./validations/validationInputValues');

const register = async ({ displayName, email, password, image }) => {
  const error = validateUser(displayName, email, password, image);
  if (error.type) return error;

  const newUser = await User.create({ displayName, email, password, image });
  return { type: null, message: newUser };
};

module.exports = {
  register,
};