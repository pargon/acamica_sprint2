const express = require('express');
const router = express.Router({mergeParams: true});

router.get('', async (req, resp) =>{
    resp.json(`Todos`);
});

router.get('/:id', async (req, resp) =>{
    resp.json(`Todos de id ${req.params.id}`);
});

router.get('/nombre/:name', async (req, resp) =>{
    resp.json(`Todos nombre ${req.params.name}`);
});


module.exports = router;
