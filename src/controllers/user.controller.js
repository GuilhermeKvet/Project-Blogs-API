const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const newUser = await userService.register(req.body);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: newUser.id } }, secret, jwtConfig);

  if (newUser.type) {
    return res.status(errorMap.mapError(newUser.type)).json({ message: newUser.message });
  }

  return res.status(201).json({ token });
};

const findAll = async (req, res) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getByUserId(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = {
  register,
  findAll,
  getByUserId,
};