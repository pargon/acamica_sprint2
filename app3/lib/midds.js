const structures = require('./structures');

//
// funciones
//
function existenProductosDetalle(detalle){

    for(it = 0; it<detalle.length; it++){
        // busca producto por codigo y valida
        let prod = structures.productos.find( (prd) => prd.codproducto === detalle[it].codproducto );
        if(!prod){
            return false;
        }    
    }
    return true;
}

//
// middelware
//
const validaNuevoUsuario = (req, res, next) => {

    // busca mail
    let usumail = structures.usuarios.find( (usu) => usu.mail === req.body.mail); 

    if (usumail){
        res.status(403).send('Ya existe registro de ese mail');
    }else{

        // busca por usuid
        let usuid = structures.usuarios.find( (usu) => usu.userid === req.body.userid);
        if(usuid){
            res.status(403).send('Ya existe registro de ese usuario');
        }else{
            next();
        }
    }
}
const validaDetallePedido = (req, res, next) => {

    let esDetalleOk = existenProductosDetalle(req.body.detalle);

    if(!esDetalleOk){
        res.status(406).send(`Existen productos inválidos`);
    }else{
        let medpag = structures.mediospago.find( (medio) => medio.codmediopago === req.body.codmediopago );
        if( medpag ){
            next();    
        }else{
            res.status(406).send(`Medio de Pago inválido`);
        }
    }
}
const validaModificaPedido = (req, res, next) => {
    const jsonped =  req.body ;    

    const usuheader = structures.usuarios[req.header('sesionid')];

    let numpedido = Number.parseInt( jsonped.numero);

    const index = structures.pedidos.findIndex( (ped) => ped.numero === numpedido);

    if (index > -1){
        let usuarray = structures.pedidos[index];
        if ( usuarray.userid === usuheader.userid || usuheader.admin){
            if (structures.pedidos[index].estado === "Pendiente"){
                next();
            }else{
                res.status(406).send('El Pedido debe estar Pendiente');
            }
        }else{
            res.status(405).send('Usuario no es propietario del numero de pedido');
        }
    }else{
        res.status(404).send('Pedido no encontrado');
    }
}

const validaSesion = (req, res, next) => {

    let ususesion = structures.usuarios[req.header('sesionid')];

    if (ususesion){
        next();
    }else{
        res.status(404).send('No existe sesión con ese id');
    }
}
const validaUsuarioAdmin = (req, res, next) => {

    let husu = structures.usuarios[ req.header('sesionid')];
    console.log(husu);

    if ( husu.admin ){
        if ( husu ){
            next();
        }else{
            res.status(404).send('Usuario no existe');
        }
    }else{
        res.status(401).send('Usuario no es Admin');
    }
}


module.exports = {validaNuevoUsuario, validaDetallePedido, validaModificaPedido, validaSesion, validaUsuarioAdmin}