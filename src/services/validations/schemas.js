const Joi = require('joi');

const idCategory = Joi.number().integer().min(1).required();

const newUserSchema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .message({ 'string.empty': '"displayName" length must be at least 8 characters long' })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({ 'string.empty': '"email" must be a valid email' })
    .required(),
  password: Joi.string()
    .min(6)
    .messages({ 'string.empty': '"password" length must be at least 6 characters long' })
    .required(),
  image: Joi.string(),
});

const newPostSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().items(idCategory).required(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

module.exports = {
  newUserSchema,
  newPostSchema,
  postUpdateSchema,
};