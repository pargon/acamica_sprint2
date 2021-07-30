const ProductModel = require('../models/productModel');

const getAllProcuct = async () => {
  return await ProductModel.findAll(); 
}

module.exports = {
    getAllProcuct
};