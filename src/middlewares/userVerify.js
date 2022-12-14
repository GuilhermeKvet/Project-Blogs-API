const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (!exists) return next();
  return res.status(409).json({ message: 'User already registered' });
};