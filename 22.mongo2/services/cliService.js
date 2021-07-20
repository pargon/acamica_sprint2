const { json } = require('express');
const climodel = require('../models/clientes-model');
//const usuCuenta = require('../models/usuCuenta-model');

const altaCliente = async ( cliente ) =>{

    console.log(cliente);
    
    const session = await climodel.startSession();
    session.startTransaction();

    const result = await climodel.findOne({email: cliente.email});
    if (!result){
        
        await climodel.create([cliente], {session:session});        
        await session.commitTransaction();
        session.endSession();

        return await climodel.findOne({email:cliente.email});
    }else{
        console.log('no crea');
        sesion.abortTransaction();
        sesion.endSession();
        return 'Ya existe mail';
    } 
}

module.exports = {altaCliente};
