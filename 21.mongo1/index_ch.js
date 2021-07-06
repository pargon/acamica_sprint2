const mongo = require('./mongo_ch');
const express = require('express');
const server = express();
server.listen(5050);


server.post('/holamundo', mongo.grabar, (req, res) =>{

    res.send('OK');
} );