require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'shape_of_voice',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'cloud_ascending',
    password: process.env.SHAPE_OF_VOICE,
    database: 'shape_of_voice',
    port: 9999,
    host: 'shape-of-voice.c7wh8zjlh1p9.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
    },
  },
};
