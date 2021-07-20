// instancia de dependnecias
const express = require('express');
const cliService = require('../services/estudiantesServ');

const router = express.Router();

// endpoints
router.get('/', async (req, resp) =>{

    resp.json( await cliService.todosEstudiantes());
});
