const express = require('express');
const { userController } = require('../controllers');
const { emailVerify, validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', emailVerify, userController.register);

router.get('/', validateJWT, userController.findAll);

router.get('/:id', validateJWT, userController.getByUserId);

router.delete('/me', validateJWT, userController.deleteUser);

module.exports = router;