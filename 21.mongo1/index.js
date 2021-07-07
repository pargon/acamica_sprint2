const crear = require('./crear');
const listar = require('./listar');
const borrarUno = require('./borrar');
const express = require('express');
const server = express();

server.listen(5050);
server.use(express.json());

server.post('/crear', crear.grabar, (req, res) => res.send('OK'));
server.get('/listar', listar.listar, (req, res) => res.send('OK'));
server.delete('/', borrarUno.borraruno, (req, res) => res.send('OK'));

