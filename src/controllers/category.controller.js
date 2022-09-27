const { categoryService } = require('../services');
const errorMap = require('../utils/errorMap');

const register = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.register(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

const findAll = async (req, res) => {
  const categories = await categoryService.findAll();
  return res.status(200).json(categories);
};

module.exports = {
  register,
  findAll,
};