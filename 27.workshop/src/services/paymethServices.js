const PayMethModel = require('../models/paymethModel');

const getAllPayMeth = async () => {
  return await PayMethModel.findAll(); 
}

module.exports = {
    getAllPayMeth
};