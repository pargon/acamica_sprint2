// instancia de dependnecias
const { json } = require('express');
const express = require('express');
const climodel = require('./clientes-model');

// config server
const srv = express();
srv.listen(5050);
srv.use(express.json());

// endpoints
srv.post('/cliente', async (req, resp) =>{

    const {
        nombre,
        apellido,
        email        
    } = req.body;

    const result = await climodel.find({email:email});
    if (result.length == 0){

        const dbcliente = await new climodel({nombre:nombre, apellido:apellido, email:email});
        await dbcliente.save();
        resp.send('OK');
    }else{
        resp.status(401).send('Ya existe mail');
    }    
});

srv.post('/cliente/:email/contacto', async (req, resp) => {
    const email = req.params.email;
    const {
        telefono,
        direccion
    } = req.body;

    // busca en DB para el mail dado
    const result = await climodel.find({email:email});
    if (result.length == 0){
        resp.status(401).send('No existe mail');
    }else{
        // grabo datos en variable basada en obj. encontrada en DB
        result[0].contacto = [{telefono:telefono, direccion:direccion}];

        // creo instancia DB copia del objeto encontrado
        const dbcliente = await new climodel(result[0]);
        await dbcliente.save();

        resp.send('OK');
    }
});

srv.get('/transaccion', (req, resp) =>{

});
