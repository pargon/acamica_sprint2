// Instancia de depndencias
const express = require('express');
const students = require('./routes/students');

// configuración del server
const server = express();
server.listen(5050, () => console.log('Listen on 5050 port'));
server.use(express.json());

// endpoints
server.use('/students', students);