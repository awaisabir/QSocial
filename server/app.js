import dotenv from 'dotenv';
const result = dotenv.config();

import { error } from 'util';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

/** import routes */

if (!result.error) {
  const auth = require('./api/auth');
  const posts = require('./api/posts');

  const PORT = process.env.PORT || 4200;
  const app = express();
  
  app.use(express.static('../client/build'));
  
  /** Middleware(s) */
  app.use(cors());
  app.use(bodyParser.json());
  
  /** Passport Config */
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(passport);
  
  /** use routes */
  app.use('/api/auth', auth);
  app.use('/api/posts', posts);
  
  app.get('*', (req, res) => {
    res.send('404');
  });
  
  const models = require('./db/index');
  models.default.sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`App listening on ${PORT}`));
  });
} else
  throw error(`Could not load environment variables`);
