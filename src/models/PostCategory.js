module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, foreignKey: true },
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostCategories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
      as: 'categories'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
      as: 'blog_posts'
    });
  }

  return PostCategory;
};