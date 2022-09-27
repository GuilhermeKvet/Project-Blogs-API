const express = require('express');
const { postController } = require('../controllers');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, postController.register);

router.get('/', validateJWT, postController.findAll);

module.exports = router;