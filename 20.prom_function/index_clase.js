const express = require('express');
const fetch = require('node-fetch');

const server = express();
server.listen(3001);

server.get('/noticias', async (req, res) => {
    let respuesta = [];
    let top = req.query.top;

    const data = await fetch(
    "https://google-search3.p.rapidapi.com/api/v1/news/q=colombia", {
    "method": "GET",
    headers: {
        'x-rapidapi-key': '3b1b607058msh15fae0dfb9410fbp1cb395jsne03b86f4f616',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .catch( err => console.log(err));

    // // hacer el filtro con funciones de array
    // respuesta = data?.entries
    //   .filter((item,index) => index < 5)
    //   .map(item => ({
    //     titulo: item.title,
    //     resumen: item.summary
    //   }));

    // hacer el filtro con for
    for (let i = 0; i < top && data?.entries?.length; i++) {

        respuesta.push({
        titulo: data?.entries[i].title,
        resumen: data?.entries[i].summary
    })
    }

    res.json(respuesta);
})