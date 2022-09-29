const { User } = require('../models');

const login = async (email, password) => User.findOne({ where: { email, password } });

module.exports = {
  login,
};