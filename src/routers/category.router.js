const express = require('express');
const { categoryController } = require('../controllers');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, categoryController.register);

module.exports = router;