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

module.exports = {
  register,
};