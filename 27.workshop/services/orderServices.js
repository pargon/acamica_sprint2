const OrderModel = require('../models/pedido');
const UserModel = require('../models/usuario');
const PayMethModel = require('../models/mediopago');

const getAllOrders = async () => {
    return await OrderModel.findAll({
    include:[ 
      {model:UserModel},
      {model:PayMethModel}
    ]
  }); 
  }
  
module.exports = {
    getAllOrders
};