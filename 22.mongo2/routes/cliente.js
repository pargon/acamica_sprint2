// instancia de dependnecias
const express = require('express');
const cliService = require('../services/cliService');

const router = express.Router();

// endpoints
router.post('/', async (req, resp) =>{

    try{
        const {
            nombre,
            apellido,
            email        
        } = req.body;

        const cli = {
            nombre:nombre,
            apellido:apellido,
            email:email
        };
        resp.send( await cliService.altaCliente(cli));

    }catch(error){
        
        console.error(error);
        resp.status(400).send(error);    
    }
});

module.exports = router;



/*
router.post('/cliente/:email/contacto', async (req, resp) => {
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

router.post('/altausuario', async (req, resp) =>{
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

router.put('/saldo', async (req, resp) =>{

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

router.put('/transferencia', async (req, resp) =>{

    // usuario param
    const {emailOrigen, emailDestino, monto} = req.body;    

    // inicio sesion 
    const ses = await usuCuenta.startSession();
    // inicio TRN
    ses.startTransaction();

    // busca registro a partir de mail Origen
    const resultOrigen = await usuCuenta.findOne({email:emailOrigen}).session(ses);

    await ses.abortTransaction();

    //console.log(resultOrigen);
    resp.status(404).send('No existe mail Origen');


//     if (resultOrigen.length == 0){

//         // sale de la transacción 
//         await ses.abortTransaction();

//         // no encuentra cuenta
//         resp.status(404).send('No existe mail Origen');
//     }else{

//         // busca registro a partir de mail Destino
//         const resultDestino = await usuCuenta.find({email:emailDestino}).session(ses);

//         if (resultDestino.length == 0){

//             // sale de la transacción 
//             await ses.abortTransaction();

//             // no encuentra cuenta
//             resp.status(404).send('No existe mail Destino');
//         }else{

//             // parsea numerico
//             const saldoOrigen = Number.parseInt( resultOrigen[0].saldo ); 
//             const nmonto = Number.parseInt(monto);

//             resultOrigen[0].saldo = saldoOrigen - nmonto;

//             // guarda en base
// //            const dbCtaO = new usuCuenta(resultOrigen[0]);

//             if (saldoOrigen < nmonto){

//                 // sale de la transacción 
//                 await ses.abortTransaction();

//                 // no hay saldo
//                 resp.status(401).send('No hay saldo suficiente en Origen');
//             }else{

//                 const saldoDestino = Number.parseInt( resultDestino[0].saldo ); 
//                 resultDestino[0].saldo = saldoDestino + nmonto;

//                 // guarda en base
// //                const dbCtaD = new usuCuenta(resultDestino[0]);
// //                await dbCtaD.save();        
                
//                 // fin transacción: COMMIT
//                 await ses.commitTransaction();

//                 resp.send('OK');
//             }
//         }
//     }

    console.log('endsesion');
    // fin sesion
    ses.endSession();

});
*/
