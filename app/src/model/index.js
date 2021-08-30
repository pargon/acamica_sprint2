const Sequelize = require('sequelize');
const { createModel } = require('./models');

const chalk = require('chalk');

const models ={};

async function connect(host, port, username, password, database){
    
    const conn = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect: 'mariadb',
        timestamps: false        
    });

    const modelList = createModel(conn);    
    models.UserModel = modelList.User;
    models.ProductModel = modelList.Product;
    models.PayMethModel = modelList.PayMeth;
    models.OrderModel = modelList.Order;
    
    try{
        await conn.authenticate();
        await conn.sync();
        console.log(chalk.cyan('DB: Connect Success'));
    }catch(err){
        console.log(chalk.cyan('DB: Error connect', err));
    }
}

function getModel(name){
    if (!models[name]){
        console.log(chalk.magenta( `No existe model ${name}`));
        return null;
    }
    return models[name];
}

module.exports = {
    connect,
    getModel,
};