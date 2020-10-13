const Sequelize = require('sequelize');

module.exports = new Sequelize('codegig', 'postgres', '1234567', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000
  },
});