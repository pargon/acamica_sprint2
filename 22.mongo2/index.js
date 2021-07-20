// instancia de dependnecias
const express = require('express');
const routecli = require('./routes/cliente');

// config server
const srv = express();
srv.listen(5050, ()=>console.log('Listen in 5050'));
srv.use(express.json());

// endpoints
srv.use('/cliente', routecli);