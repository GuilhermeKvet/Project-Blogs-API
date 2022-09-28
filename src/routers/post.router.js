const express = require('express');
const { postController } = require('../controllers');
const { validateJWT, validateAuthorizationPost } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, postController.register);

router.get('/', validateJWT, postController.findAll);

router.get('/:id', validateJWT, postController.findById);

router.put('/:id', validateJWT, validateAuthorizationPost, postController.update);

router.delete('/:id', validateJWT, validateAuthorizationPost, postController.deletePost);

module.exports = router;