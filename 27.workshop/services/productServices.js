const ProductModel = require('../models/producto');

const getAllProcuct = async () => {
  return await ProductModel.findAll(); 
}

module.exports = {
    getAllProcuct
};