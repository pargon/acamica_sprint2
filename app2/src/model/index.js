const Sequelize = require('sequelize');
const { createUserModel } = require('./models/userModel');
const { createProductModel } = require('./models/productModel');
const { createPaymethModel} = require('./models/paymethModel');
const { createOrderModel } = require('./models/orderModel');

const models ={};

async function connect(host, port, username, password, database){
    
    const conn = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect: 'mariadb',        
    });

    models.UserModel = createUserModel(conn);
    models.ProductModel = createProductModel(conn);
    models.PayMethModel = createPaymethModel(conn);
    models.Order = createOrderModel(conn);
    
    try{
        await conn.authenticate();
        await conn.sync();
        console.log('DB: Connect Success');
    }catch(err){
        console.log('DB: Error connect', err);
    }
}

function getModel(name){
    if (!models[name]){
        global.console.log('No existe model');
        return null;
    }
    return models[name];
}

module.exports = {
    connect,
    getModel
};