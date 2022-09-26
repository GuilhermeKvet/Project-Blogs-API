const Joi = require('joi');

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

module.exports = {
  newUserSchema,
};