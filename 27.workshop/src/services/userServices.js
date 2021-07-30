const UserModel = require('../models/userModel');

const getAllUsers = async () => {
  return await UserModel.findAll(); 
}

module.exports = {
    getAllUsers
};