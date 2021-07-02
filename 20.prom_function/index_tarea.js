const express = require('express');
const fetch = require('node-fetch');
const server = express();
server.listen(3001);

const ciudades = [
  {
    ciudad: 'Bogota',
    tempereatura: 0
  },
  {
    ciudad: 'London',
    tempereatura: 0
  },
  {
    ciudad: 'Cali',
    tempereatura: 0
  },
  {
    ciudad: 'buenos aires',
    tempereatura: 0
  },
  {
    ciudad: 'rosario',
    tempereatura: 0
  },
  {
    ciudad: 'Mar del plata',
    tempereatura: 0
  },
  {
    ciudad: 'Puerto Iguazu',
    tempereatura: 0
  },
  {
    ciudad: 'Mendoza',
    tempereatura: 0
  },
  {
    ciudad: 'Medellin',
    tempereatura: 0
  },
  {
    ciudad: 'Caracas',
    tempereatura: 0
  }
];

server.get('/ciudadesAleatoreas', (req, res) => {
  let aleatorios = [];

  while (aleatorios.length <= 3) {
    const aleatorio = Math.floor(Math.random() * (9 - 0)) + 0;
    if (!aleatorios.includes(aleatorio)) {
      aleatorios.push(aleatorio);
    }
  }

  let listaFinal = [];
  listaFinal.push(ciudades[aleatorios[0]]);
  listaFinal.push(ciudades[aleatorios[1]]);
  listaFinal.push(ciudades[aleatorios[2]]);

  Promise.all([
    fetch(`http://api.weatherapi.com/v1/current.json?key=0af123443bcd4f4fb1c225806210107&q=${listaFinal[0].ciudad}`)
    .then(response => response.json()),
    fetch(`http://api.weatherapi.com/v1/current.json?key=0af123443bcd4f4fb1c225806210107&q=${listaFinal[1].ciudad}`)
    .then(response => response.json()),
    fetch(`http://api.weatherapi.com/v1/current.json?key=0af123443bcd4f4fb1c225806210107&q=${listaFinal[2].ciudad}`)
    .then(response => response.json())
  ])
  .then(data => {
    listaFinal[0].tempereatura = data[0].current.temp_c;
    listaFinal[1].tempereatura = data[1].current.temp_c;
    listaFinal[2].tempereatura = data[2].current.temp_c;

    res.json(listaFinal);
  })
  .catch(error => {
    console.error(error);
    res.status(502).json(error);
  })
})


server.get('/ciudad', async (req, res) => {
    let ciudad = req.query.ciudad;
  
    let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=0af123443bcd4f4fb1c225806210107&q=${ciudad}`)
                    .then(response => response.json())
                    .then(data =>  data?.current?.temp_c);
                    
    res.json(data);
})
  