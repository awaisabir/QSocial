// User Schema
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
        type: DataTypes.TEXT,
        unique: true,
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    createdAt: {
      type:  DataTypes.DATE,
      default: Date.now(),
    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    password: DataTypes.TEXT,
    image: DataTypes.TEXT,
  });

  User.associate = models => {
    models.User.hasMany(models.Post);
    models.User.hasMany(models.Comment);

    models.User.belongsToMany(models.Post, {
      through: 'Likes'
    });

    models.User.belongsToMany(models.Post, {
      through: 'Dislikes'
    });
  };

  return User;
};