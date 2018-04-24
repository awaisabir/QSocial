// Comments Schema
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
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
    }
  });

  return Comment;
};