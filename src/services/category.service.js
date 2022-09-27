const { Category } = require('../models');

const register = async (name) => {
  if (!name || name.length < 1) return { type: 'INVALID_VALUE', message: '"name" is required' };
  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

const findAll = async () => Category.findAll();

module.exports = {
  register,
  findAll,
};