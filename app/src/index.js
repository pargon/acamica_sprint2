
const express = require('express');
const chalk = require('chalk');
const { config } = require("dotenv");
const { connect } = require('./model');
const { initialize } = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const { createRouter:createUserRouter } = require('./controllers/routers/users');
const { createRouter:createProductRouter } = require('./controllers/routers/products');
const { createRouter:createPayMethRouter } = require('./controllers/routers/paymeths');
const { createRouter:createOrderRouter } = require('./controllers/routers/orders');

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
      
  //console.log(chalk.green(MYSQL_HOST));
  
  // express
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false}));
  server.listen(PORT, ()=> console.log(`Server running ${PORT}`));
  
  //Swagger
  const controllersFolder = path.join(__dirname, './controllers/routers/*.js');
  const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Delilah Restó API",
            version: "2.0.0",
            description: "by Gonzalo Parra" 
        }
    },
    apis: [controllersFolder]
  }
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  // endpoints
  server.use('/api/v1/users', createUserRouter());
  server.use('/api/v1/products', createProductRouter());
  server.use('/api/v1/paymeths', createPayMethRouter());
  server.use('/api/v1/orders', createOrderRouter());
  
  // database 
  await connect(MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE);
  initialize();

}

main();
