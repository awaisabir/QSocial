import bcrypt from 'bcryptjs';

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
      defaultValue: false,
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

    User.getUserById = id => {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await User.findAll({
            where: {id}
          });
  
          resolve(user);
        } catch (error) { reject(error); }
      });
    }
  
    User.getUserByUsername = username => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await User.findAll({ where: { username }});
          resolve(res);
        } catch (error) { reject(error); }
      });
    };
  
    User.comparePasswords = (entered, actual) => {
      return new Promise(async (resolve, reject) => {
        try {
          const isMatch = await bcrypt.compare(entered, actual);
          resolve(isMatch);
        } catch (error) { reject(error); }
      });
    };
  
    User.saveUser = user => {
      return new Promise((resolve, reject) => {
        const { password } = user;
        
        bcrypt.genSalt(15, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            try {
              if (err) reject(err);
  
              user.password = hash;
              const res = await user.save();
              resolve(res);
            } catch (error) { reject(error); }
          });
        });
      });
    };
  };


  return User;
};