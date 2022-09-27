const { newUserSchema, newPostSchema, postUpdateSchema } = require('./schemas');
const { Category, BlogPost } = require('../../models');

const validateUser = (displayName, email, password, image) => {
  const { error } = newUserSchema.validate({ displayName, email, password, image });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validatePost = async (title, content, categoryIds) => {
  const { error } = newPostSchema.validate({ title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };

  const categories = await Promise.all(
    categoryIds.map(async (category) => Category.findByPk(category)),
  );

  const notFoundCategory = categories.some((category) => category === null);
  if (notFoundCategory) return { type: 'INVALID_VALUE', message: '"categoryIds" not found' };

  return { type: null, message: '' };
};

const validateEditPost = async (id, title, content, userId) => {
  const { error } = postUpdateSchema.validate({ title, content });
  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };

  const { dataValues } = await BlogPost.findByPk(id);

  const unauthorizedPostEdit = dataValues.userId !== userId;
  if (unauthorizedPostEdit) return { type: 'INVALID_USER', message: 'Unauthorized user' };

  return { type: null, message: '' };
};

module.exports = {
  validateUser,
  validatePost,
  validateEditPost,
};