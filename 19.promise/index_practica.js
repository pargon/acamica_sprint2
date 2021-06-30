const fetch = require('node-fetch');
const express = require('express');
const server = express();
//API a utilizar
//https://openweathermap.org/
////CIudades
let ciudades = ["Buenos Aires", "Bogota", "Anzoategui", "Carilo"];
server.use(express.json());
server.get('/ciudades', (req,resp)=>{
  resp.status(200).json(ciudades);
})
server.listen(8080,()=>{
  console.log("El servidor es 8080")
})