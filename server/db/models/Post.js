// Posts Schema

export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    heading: DataTypes.TEXT,
    thumbnail: {
      type: DataTypes.TEXT,
      defaultValue: 'N/A',
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
  });

  Post.associate = models => {
    models.Post.belongsToMany(models.Category, {through: 'PostCategory'});
    models.Post.hasMany(models.Comment);
    
    Post.getPostById = id => {
      return new Promise(async (resolve, reject) => {
        try {
          const post = await Post.findAll({
            where: {id},
            include: [{
              model: models.Category,
              where: {PostId: sequelize.col('Post.id')}
            }],
          });
  
          resolve(post);
        } catch (error) { reject(error); }
      });
    };

    Post.savePost = post => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await post.save();
  
          resolve(res);
        } catch (error) { reject(error); }
      });
    };
  
    Post.deletePost = id => {
      return new Promise(async (resolve, reject) => {
        try {

          const res = await Post.destroy({where: {id}});
          resolve(res);
        } catch (error) { reject(error); }
      });
    };
  
    Post.getPosts = (page, heading, order) => {
      return new Promise(async (resolve, reject) => {
        try {
          let skip = 0;
          let query = {};
  
          if (page > 1)
            skip = (page * 10) - 10;
  
          if (heading) {
            query.where = {heading: {like: `%${heading}%`}};
            query.offset = skip;
            query.limit = 10;
            query.order = sequelize.literal(`createdAt ${order}`);
            query.include = [{
              model: models.Category,
            }];
          }

          // deal with categories later
          
          const res = await Post.findAll(query);
          resolve(res);
        } catch (error) { reject(error); }
      });
    };
  };



  return Post;
};