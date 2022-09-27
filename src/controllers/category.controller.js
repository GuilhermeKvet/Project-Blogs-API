const { categoryService } = require('../services');
const errorMap = require('../utils/errorMap');

const register = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.register(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  register,
};