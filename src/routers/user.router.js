const express = require('express');
const { userController } = require('../controllers');
const { emailAlreadyExists } = require('../middlewares/userVerify');

const router = express.Router();

router.post('/', emailAlreadyExists, userController.register);

module.exports = router;