const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`);

module.exports = sequelize;