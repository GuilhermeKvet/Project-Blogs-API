const { User } = require('../models');

const login = async (email) => User.findOne({ where: { email } });

module.exports = {
  login,
};