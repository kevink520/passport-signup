const Sequelize = require('sequelize');

const user = 'u0_a198';
const password = '';
const host = 'localhost';
const database = 'testingpassport';

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;

