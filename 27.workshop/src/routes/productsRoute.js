var express = require('express');    
const productServices = require('../services/productServices');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await productServices.getAllProcuct();
    res.json(result);
  } 
  catch (error) {
    // si existe un error lo atrapamos aqui y lo devolvemos
    console.error(error);
    res.status(500).json(error);
  }
})

module.exports = router;