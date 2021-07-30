const express = require('express');
const estudiantesRouter = require('./src/routes/estudiantes');
require('dotenv').config();


const server = express();
server.listen(
    process.env.EXPRESS_PORT, 
    ()=> console.log(`Inica en ${process.env.EXPRESS_PORT}`)
);

server.use('/estudiantes', estudiantesRouter);