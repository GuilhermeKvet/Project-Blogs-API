const { BlogPost, PostCategory } = require('../models');
const { validatePost } = require('./validations/validationInputValues');

const register = async (userId, { title, content, categoryIds }) => {
  const error = await validatePost(title, content, categoryIds);
  if (error.type) return error;

  const newPost = await BlogPost.create({ title, content, userId });

  const addPostCategory = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));

  await PostCategory.bulkCreate(addPostCategory);

  return { type: null, message: newPost };
};

module.exports = {
  register,
};