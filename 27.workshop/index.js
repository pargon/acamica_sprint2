// Instancia de depndencias
const express = require('express');
const users = require('./src/routes/usersRoute');
const products = require('./src/routes/productsRoute');
const paymentsmeth = require('./src/routes/paymethRoute');
const orders = require('./src/routes/ordersRoute');

require('dotenv').config();


// configuración del server
const server = express();
server.listen(process.env.EXPRESS_PORT, () => console.log(`Listen on ${process.env.EXPRESS_PORT} port`));
server.use(express.json());

// endpoints
server.use('/users', users);
server.use('/products', products);
server.use('/paymentsmeth', paymentsmeth);
server.use('/orders', orders);