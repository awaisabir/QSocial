// User Model
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    createdAt: {
      type:  DataTypes.DATE,
      default: Date.now(),
    },
    image: DataTypes.STRING,

  });

  User.associate = (models) => {
    // a User has many posts
    User.hasMany(models.Post, {
      foreignKey: {
        user_id: 'user_id',
        field: 'user_id',
      }
    });
  };

  return User;
};