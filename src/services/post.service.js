const { User, BlogPost, PostCategory, Category } = require('../models');
const { validatePost, validateEditPost } = require('./validations/validationInputValues');

const register = async (userId, { title, content, categoryIds }) => {
  const error = await validatePost(title, content, categoryIds);
  if (error.type) return error;

  const newPost = await BlogPost.create({ title, content, userId });

  const addPostCategory = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));

  await PostCategory.bulkCreate(addPostCategory);

  return { type: null, message: newPost };
};

const findAll = async (userId) => BlogPost.findAll({
  where: { userId },
  include: [
    { model: User, as: 'user', on: { id: userId }, attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const findById = async (id) => BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const update = async (id, title, content, userId) => {
  const error = await validateEditPost(id, title, content, userId);
  if (error.type) return error;
  await BlogPost.update({ title, content }, { where: { id } });
  const updated = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: updated };
};

module.exports = {
  register,
  findAll,
  findById,
  update,
};