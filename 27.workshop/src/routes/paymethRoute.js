var express = require('express');    
const paymethServices = require('../services/paymethServices');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await paymethServices.getAllPayMeth();
    res.json(result);
  } 
  catch (error) {
    // si existe un error lo atrapamos aqui y lo devolvemos
    console.error(error);
    res.status(500).json(error);
  }
})

module.exports = router;