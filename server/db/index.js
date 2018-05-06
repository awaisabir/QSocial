import Sequelize from 'sequelize';

/** Sequelize setup */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, {
  dialect: 'sqlite',
  storage: `${__dirname}/${process.env.DB_NAME}.db`,
  logging: false,
});

const models = {
  User: sequelize.import('./models/User'),
  Post: sequelize.import('./models/Post'),
  Category: sequelize.import('./models/Category'),
  Comment: sequelize.import('./models/Comment'),
};


Object.keys(models).forEach(modelName => {
if (models[modelName].associate) {
  models[modelName].associate(models);
}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;