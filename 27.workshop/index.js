// Instancia de depndencias
const express = require('express');
const users = require('./routes/users');
const products = require('./routes/products');
const paymentsmeth = require('./routes/paymeth');
const orders = require('./routes/orders');


const PORT = 5050;

// configuración del server
const server = express();
server.listen(PORT, () => console.log(`Listen on ${PORT} port`));
server.use(express.json());

// endpoints
server.use('/users', users);
server.use('/products', products);
server.use('/paymentsmeth', paymentsmeth);
server.use('/orders', orders);