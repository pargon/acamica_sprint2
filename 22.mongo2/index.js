// instancia de dependnecias
const { json } = require('express');
const express = require('express');
const climodel = require('./clientes-model');
const usuCuenta = require('./usuCuenta-model');


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

srv.post('/altausuario', async (req, resp) =>{
    const {
        nombre,
        apellido,
        email,
        saldoInicial
    } = req.body;

    const result = await usuCuenta.find({email:email});
    if (result.length == 0){

        const dbcliente = await new usuCuenta({nombre:nombre, apellido:apellido, email:email, saldo:saldoInicial});
        await dbcliente.save();
        resp.send('OK');
    }else{
        resp.status(401).send('Ya existe mail');
    }    
});

srv.put('/saldo', async (req, resp) =>{

    // usuario param
    const {email, monto} = req.body;    

    // busca registro a partir de mail
    const result = await usuCuenta.find({email:email});

    if (result.length == 0){

        // no encuentra cuenta
        resp.status(404).send('No existe mail');
    }else{
        // parsea numerico
        const saldo = Number.parseInt( result[0].saldo ); 
        const nmonto = Number.parseInt(monto);

        result[0].saldo = saldo + nmonto;

        // guarda en base
        const dbCta = new usuCuenta(result[0]);
        await dbCta.save();
      
        resp.send('OK');
    }
});

srv.put('/transferencia', async (req, resp) =>{

    // usuario param
    const {emailOrigen, emailDestino, monto} = req.body;    

    // busca registro a partir de mail Origen
    const resultOrigen = await usuCuenta.find({email:emailOrigen});

    if (resultOrigen.length == 0){
        // no encuentra cuenta
        resp.status(404).send('No existe mail Origen');
    }else{

        // busca registro a partir de mail Destino
        const resultDestino = await usuCuenta.find({email:emailDestino});

        if (resultDestino.length == 0){
            // no encuentra cuenta
            resp.status(404).send('No existe mail Destino');
        }else{

            // parsea numerico
            const saldoOrigen = Number.parseInt( resultOrigen[0].saldo ); 
            const saldoDestino = Number.parseInt( resultDestino[0].saldo ); 
            const nmonto = Number.parseInt(monto);

            if (saldoOrigen < nmonto){
                // no hay saldo
                resp.status(401).send('No hay saldo suficiente en Origen');
            }else{

                resultOrigen[0].saldo = saldoOrigen - nmonto;
                resultDestino[0].saldo = saldoDestino + nmonto;
                console.log(`saldo ori: ${saldoOrigen} y saldodest: ${saldoDestino}`);

                // guarda en base
                const dbCtaO = new usuCuenta(resultOrigen[0]);
                await dbCtaO.save();
                const dbCtaD = new usuCuenta(resultDestino[0]);
                await dbCtaD.save();        
                
                resp.send('OK');
            }
        }
    }
});
