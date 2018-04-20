import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/db';

const db = {};

/** Sequelize setup */
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  dialect: 'sqlite',
  storage: `${__dirname}/${dbConfig.DB_NAME}.db`
});

// import models here
fs.readdirSync(`${__dirname}/models`)
.filter(file => file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
.forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate)
    db[modelName].associate(db);
});

(async () => {
  try {
    let result = await sequelize.authenticate();
    console.log(`Connection has successfully been established`);

  } catch (err) { throw(`Unable to make connection`, err); }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

