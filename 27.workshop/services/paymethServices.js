
const PayMethModel = require('../models/mediopago');

const getAllPayMeth = async () => {
  return await PayMethModel.findAll(); 
}

module.exports = {
    getAllPayMeth
};