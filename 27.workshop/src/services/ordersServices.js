const OrderModel = require('../models/orderModel');
const UserModel = require('../models/userModel');
const PayMethModel = require('../models/paymethModel');
const OrderDetailModel = require('../models/orderDetailModel');

const getAllOrders = async () => {
    return await OrderModel.findAll({
    include:[ 
      {model:UserModel},
      {model:PayMethModel},
      {model:OrderDetailModel}
    ]
  }); 
  }
  
module.exports = {
    getAllOrders
};