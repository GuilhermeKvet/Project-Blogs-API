const { Op } = require('sequelize');
const { User, BlogPost, PostCategory, Category } = require('../models');
const { validatePost, validateInputs } = require('./validations/validationInputValues');

const includeInfo = {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
};

const register = async (userId, { title, content, categoryIds }) => {
  const error = await validatePost(title, content, categoryIds);
  if (error.type) return error;

  const newPost = await BlogPost.create({ title, content, userId });

  const addPostCategory = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));

  await PostCategory.bulkCreate(addPostCategory);

  return { type: null, message: newPost };
};

const findAll = async (userId) => BlogPost.findAll({ where: { userId }, ...includeInfo });

const findById = async (id) => BlogPost.findByPk(id, { ...includeInfo });

const update = async (id, title, content) => {
  const error = await validateInputs(title, content);
  if (error.type) return error;
  await BlogPost.update({ title, content }, { where: { id } });
  const updated = await BlogPost.findByPk(id, { ...includeInfo });
  return { type: null, message: updated };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

const findSearch = async (q) => {
  const postSearch = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ],
    },
    ...includeInfo,
  });
  return postSearch;
};

module.exports = {
  register,
  findAll,
  findById,
  update,
  deletePost,
  findSearch,
};