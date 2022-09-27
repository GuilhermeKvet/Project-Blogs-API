const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const register = async (req, res) => {
  const { data: { userId } } = req.user;

  const { type, message } = await postService.register(userId, req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const findAll = async (req, res) => {
  const { data: { userId } } = req.user;
  const users = await postService.findAll(userId);
  return res.status(200).json(users);
};

module.exports = {
  register,
  findAll,
};