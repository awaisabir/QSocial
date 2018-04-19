import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/db';

let db = {};
/** Sequelize setup */
class DBInterface {
  constructor() {
    if (!DBInterface.instace) {
      this.sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
        dialect: 'sqlite',
        storage: `${__dirname}/QSocial.db`
      });
    }

    DBInterface.instace = this;
  }

  async authenticate() {
    try {
      let result = await this.sequelize.authenticate();
      console.log(`Connection has successfully been established`);

    } catch (err) { console.log(`Unable to make connection`, err); }
  }

  initialize() {
    fs.readdirSync(`${__dirname}/models`)
    .filter(file => file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
    .forEach(file => {
      let model = this.sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate)
        db[modelName].associate(db);
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  }
}

export const db;

