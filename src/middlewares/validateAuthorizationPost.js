const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { data: { userId } } = req.user;

  const post = await BlogPost.findByPk(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  const unauthorizedPostEdit = post.dataValues.userId !== userId;
  if (unauthorizedPostEdit) return res.status(401).json({ message: 'Unauthorized user' });

  return next();
};
