// User Model
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
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    password: DataTypes.TEXT,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    createdAt: {
      type:  DataTypes.DATE,
      default: Date.now(),
    },
    image: DataTypes.TEXT,

  });

  User.associate = models => {
    // a User has many posts
    models.User.hasMany(models.Post, {
      foreignKey: {
        user_id: 'user_id',
        field: 'user_id',
      }
    });
  };

  return User;
};