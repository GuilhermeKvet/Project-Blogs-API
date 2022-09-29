const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const secret = process.env.JWT_SECRET;

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!isBodyValid(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await loginService.login(email, password);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
    
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};