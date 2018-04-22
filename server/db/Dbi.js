import Sequelize from 'sequelize';
import dbConfig from '../config/db';

/** Sequelize setup */
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  dialect: 'sqlite',
  storage: `${__dirname}/${dbConfig.DB_NAME}.db`,
  define: {underscored : true}
});

const models = {
  User: sequelize.import('./models/User'),
  Post: sequelize.import('./models/Post'),
};


Object.keys(models).forEach(modelName => {
if (models[modelName].associate) {
  models[modelName].associate(models);
}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;