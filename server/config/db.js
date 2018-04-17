// db configuration
import SECRET from './secret';

export default {
  DB_NAME: 'QSOCIAL',
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  auth_secret: SECRET
};