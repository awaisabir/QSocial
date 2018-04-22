// Posts Schema
export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    heading: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    thumbnail: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now()
    },
    editedAt: {
      type: DataTypes.DATE,
      default: Date.now()
    },
    edited: {
      type: DataTypes.BOOLEAN,
      default: false
    },
  });

  return Post;
};