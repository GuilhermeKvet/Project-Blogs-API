const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const register = async (req, res) => {
  const { data: { userId } } = req.user;

  const { type, message } = await postService.register(userId, req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const findAll = async (req, res) => {
  const { data: { userId } } = req.user;
  const posts = await postService.findAll(userId);
  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.findById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { type, message } = await postService.update(id, title, content);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.deletePost(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).json();
};

const findSearch = async (req, res) => {
  const { q } = req.query;
  const message = await postService.findSearch(q);
  
  return res.status(200).json(message);
};

module.exports = {
  register,
  findAll,
  findById,
  update,
  deletePost,
  findSearch,
};