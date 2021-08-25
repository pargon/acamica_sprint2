
const express = require('express');
const { config } = require("dotenv");
const { connect } = require('../app/src/model');
const { createRouter:createUserRouter } = require('../app/src/controllers/routers/users');
const { createRouter:createProductRouter } = require('../app/src/controllers/routers/products');
const { createRouter:createPayMethRouter } = require('../app/src/controllers/routers/paymeths');
const { createRouter:createOrderRouter } = require('../app/src/controllers/routers/orders');

async function main(){

    // variables entorno
    config();
    const PORT = process.env.EXPRESS_PORT || 4040;
    const {
        MYSQL_USER,
        MYSQL_PASS,
        MYSQL_DATABASE,
        MYSQL_PORT,
        MYSQL_HOST
    } = process.env;
    
    // express
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false}));
    server.listen(PORT, ()=> console.log(`Server running ${PORT}`));
    
    // endpoints
    server.use('/api/v1/users', createUserRouter());
    server.use('/api/v1/products', createProductRouter());
    server.use('/api/v1/paymeths', createPayMethRouter());
    server.use('/api/v1/orders', createOrderRouter());
    
    // database 
    await connect(MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE);
    //initialize();

}

main();
