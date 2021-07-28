const UserModel = require('../models/usuario');
const sequelize = require('../services/connect');

const getAllUsers = async () => {
  return await UserModel.findAll(); 
}

module.exports = {
    getAllUsers
};