const fetch = require('node-fetch');
const express = require('express');
const axios = require("axios").default;
const PORT = 5050;

const server = express();
server.use(express.json());


var options = {
    method: 'GET',
    url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk&num=10',
    headers: {
      'x-rapidapi-key': '3b1b607058msh15fae0dfb9410fbp1cb395jsne03b86f4f616',
      'x-rapidapi-host': 'google-search3.p.rapidapi.com'
    }
  };





server.get('/prueba', (req,resp)=>{
    
    axios.request(options)
    .then(function (response) {
        let data = response.data;
        console.log(data);
        resp.status(200).json(data);
    })
    .catch(function (error) {
        console.error(error);
        resp.status(401);
    });
})


server.listen(PORT,()=>{
  console.log(`El servidor es ${PORT}`)
})