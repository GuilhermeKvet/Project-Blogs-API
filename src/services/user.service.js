const { User } = require('../models');
const { validateUser } = require('./validations/validationInputValues');

const register = async ({ displayName, email, password, image }) => {
  const error = validateUser(displayName, email, password, image);
  if (error.type) return error;

  const newUser = await User.create({ displayName, email, password, image });
  return { type: null, message: newUser };
};

const getByUserId = async (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const findAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

module.exports = {
  register,
  getByUserId,
  findAll,
};