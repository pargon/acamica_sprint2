const express = require('express');
const logger = require('./lib/appmid');
const structures = require('./lib/structures');
const chk = require('./lib/midds');
const Usuario = require('./lib/clase_usuario');
const Pedido = require('./lib/clase_pedido');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { json } = require('express');
const puerto = 5050;

const server = express();

//Opciones de inicialización de la documentación Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Delilah Restó API",
            version: "1.0.0",
            description: "by Gonzalo Parra" 
        }
    },
    apis: ['./server.js']
}
//Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
//Swagger
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//
// use basicos
//
server.use(express.json());
server.use(logger);

//
// variables globales
//
let usuarioAdm = new Usuario('ADMIN', '', 'ADMIN@mail.com', '', '', 'ADMIN', 'ADMIN123');
usuarioAdm.setAdmin();
structures.usuarios.push(usuarioAdm);


//
// endpoints
//
/**
 * @swagger
 * /usuario:
 *  post:
 *    summary: Crear usuario
 *    description: Permite crear una cuenta de usuario.
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: body
 *      description: Cuerpo de una persona.
 *      in: body
 *      required: true
 *      type: string
 *      example: {nombre: String, apellido: String, mail: String, direccionenvio: String, telefono: String, userid: String, password: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Usuario Creado
 */
server.post('/usuario', chk.validaNuevoUsuario, (req, res) => {

    let usu = new Usuario(req.body.nombre, 
        req.body.apellido, 
        req.body.mail, 
        req.body.direccionenvio, 
        req.body.telefono,
        req.body.userid, 
        req.body.password );

    structures.usuarios.push(usu);
    console.log(`despues: ${JSON.stringify( structures.usuarios)}`);

    res.send('Usuario Creado');
});
/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login del usuario
 *    description: Permite iniciar sesión al usuario.
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: body
 *      description: Cuerpo de una persona.
 *      in: body
 *      required: true
 *      type: string
 *      example: {userid: String, password: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Id Login
 *      401:
 *        description: Password incorrecto
 *      404:
 *        description: Usuario no encontrado 
 */
server.post('/login', (req, res) => {
    let jsonusu = req.body;

    // buscar usuario
    let usuarioEncontrado = structures.usuarios.find( (usu) => usu.userid === jsonusu.userid);
    if (!usuarioEncontrado){
        // buscar por mail
        usuarioEncontrado = structures.usuarios.find( (usu) => usu.mail === jsonusu.userid);
    }

    console.log(usuarioEncontrado);

    if (usuarioEncontrado){
        if (usuarioEncontrado.password === jsonusu.password){
            let it = structures.usuarios.indexOf(usuarioEncontrado);            
            res.send(`${it}`);
        }else{
            res.status(401).send('Password incorrecto');
        }
    }else{
        res.status(404).send('Usuario no encontrado');
    }
});
/**
 * @swagger
 * /pedido:
 *  post:
 *    summary: Nuevo Pedido
 *    description: Permite crear un pedido a un usuario.
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un pedido.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codmediopago: String, detalle: {codproducto: String, cantidad: Number}}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 */
server.post('/pedido', chk.validaSesion, chk.validaDetallePedido, (req, res) => {

    const jsonped = req.body;
    const fecha = Date();
    const usuheader = structures.usuarios[req.header('sesionid')].userid;

    structures.nroPedido = structures.nroPedido+1;    

    let ped = new Pedido(structures.nroPedido, fecha, usuheader, jsonped.codmediopago, jsonped.detalle);

    structures.pedidos.push(ped);
    console.log(`despues: ${JSON.stringify(structures.pedidos)}`);
    
    res.send('Pedido Creado');
});
/**
 * @swagger
 * /pedido:
 *  put:
 *    summary: Actualiza Pedido
 *    description: Permite editar un pedido a un usuario.
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un pedido.
 *      in: body
 *      required: true
 *      type: string
 *      example: {numero: Number, codmediopago: String, detalle: {codproducto: String, cantidad: Number}}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *      404:
 *        description: Pedido no encontrado
 *      405:
 *        description: Usuario no es propietario del numero de pedido
 *      406:
 *        description: El Pedido debe estar Pendiente
 */
 server.put('/pedido', chk.validaSesion, chk.validaModificaPedido, chk.validaDetallePedido, (req, res) => {

    const jsonped =  req.body ;    

    const usuheader = structures.usuarios[req.header('sesionid')].userid;

    let numpedido = Number.parseInt( jsonped.numero);

    const index = structures.pedidos.findIndex( (ped) => ped.numero === numpedido);

    structures.pedidos[index].codmediopago = jsonped.codmediopago;
    structures.pedidos[index].detalle = jsonped.detalle;

    console.log(`despues: ${JSON.stringify(structures.pedidos)}`);
    res.send('Petición exitosa');
});
/**
 * @swagger
 * /mispedidos:
 *  get:
 *    summary: Lista pedidos del usuario
 *    description: Obtener un listado de pedidos del usuario.
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *      404:
 *        description: Usuario no encontrado
 *
 */
server.get('/mispedidos', chk.validaSesion, (req, res) => {
    
    const usuheader = structures.usuarios[req.header('sesionid')];

    let encontrado = structures.pedidos.filter((ped) => ped.userid === usuheader.userid);
    res.send(JSON.stringify( encontrado));
});
/**
 * @swagger
 * /pedidos:
 *  get:
 *    summary: Todos los pedidos
 *    description: Obtener un listado con todos los pedidos (sólo usuario Admin puede invocar).
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *      401:
 *        description: Usuario no es Admin
 *      404:
 *        description: Usuario no existe
 *
 */
 server.get('/pedidos', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {
    
    res.send(JSON.stringify(structures.pedidos));
});
/**
 * @swagger
 * /pedido/estado:
 *  put:
 *    summary: Actualiza estado del pedido
 *    description: Permite cambiar estado de un pedido (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Estado nuevo [Pendiente, Confirmado, En preparación, Enviado, Entregado]
 *      in: body
 *      required: true
 *      type: string
 *      example: {numero: Number, estado: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *      404:
 *        description: Pedido no encontrado
 */
server.put('/pedido/estado', chk.validaSesion, chk.validaUsuarioAdmin, chk.validaModificaPedido, (req, res) => {

    let pedidoUpd = req.body;
    console.log(pedidoUpd);

    let index = structures.pedidos.findIndex( (ped) => ped.numero === pedidoUpd.numero);
    
    structures.pedidos[index].estado = pedidoUpd.estado;
    res.send('Peticion exitosa');
});
/**
 * @swagger
 * /producto:
 *  post:
 *    summary: Crear producto
 *    description: Permite crear un producto (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un producto.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codproducto: String, descripcion: String, precio: Number}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Producto Creado
 *      405:
 *        description: Código existente
 */
 server.post('/producto', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonprod = req.body;

    if(structures.productos.find((prd) => prd.codproducto=== jsonprod.codproducto)){
        res.status(405).send('Código existente');
    }else{
        structures.productos.push(jsonprod);
        console.log(`despues: ${JSON.stringify(structures.productos)}`);
        
        res.send('Producto Creado');
    }
});
/**
 * @swagger
 * /producto:
 *  put:
 *    summary: Actualizar producto
 *    description: Permite editar un producto (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un producto.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codproducto: String, descripcion: String, precio: Number}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Petición exitosa
 *      404:
 *        description: Código no encontrado
 */
 server.put('/producto', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonprod = req.body;

    let index = structures.productos.findIndex( (prod) => prod.codproducto === jsonprod.codproducto);

    if (index > -1){
        structures.productos[index].descripcion = jsonprod.descripcion;
        structures.productos[index].precio = jsonprod.precio;

        console.log(`despues: ${JSON.stringify(structures.productos)}`);    
        
        res.send('Petición exitosa');
    }else{
        res.status(404).send('Código no encontrado')
    }

});
/**
 * @swagger
 * /producto:
 *  delete:
 *    summary: Elimina producto
 *    description: Permite eliminar un producto (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un producto.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codproducto: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Petición exitosa
 *      404:
 *        description: Código no encontrado
 */
 server.delete('/producto', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonprod = req.body;

    let index = structures.productos.findIndex( (prod) => prod.codproducto === jsonprod.codproducto);
    console.log(index);

    if (index > -1){
        structures.productos.splice(index, 1);

        console.log(`despues: ${JSON.stringify(structures.productos)}`);    
        
        res.send('Petición exitosa');
    }else{
        res.status(404).send('Código no encontrado')
    }
});
/**
 * @swagger
 * /productos:
 *  get:
 *    summary: Lista todos los productos
 *    description: Obtener un listado de todos los productos (sólo usuario Admin puede invocar).
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *
 */
 server.get('/productos', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {
    
    res.send(JSON.stringify(structures.productos));
});
/**
 * @swagger
 * /mediopago:
 *  post:
 *    summary: Crear medio de pago
 *    description: Permite crear un medio de pago (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un medio de pago.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codmediopago: String, descripcion: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Medio de Pago Creado
 *      405:
 *        description: Código existente
 */
 server.post('/mediopago', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonmed = req.body;

    if(structures.mediospago.find((med) => med.codmediopago=== jsonmed.codmediopago)){
        res.status(405).send('Código existente');
    }else{
        structures.mediospago.push(jsonmed);
        console.log(`despues: ${JSON.stringify(structures.mediospago)}`);
        
        res.send('Medio de Pago Creado');
    }
});
/**
 * @swagger
 * /mediopago:
 *  put:
 *    summary: Actualiza pedido
 *    description: Permite editar un medio de pago (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un medio de pago.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codmediopago: String, descripcion: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Petición exitosa
 *      404:
 *        description: Código no encontrado
 */
 server.put('/mediopago', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonmed = req.body;

    let index = structures.mediospago.findIndex( (med) => med.codmediopago === jsonmed.codmediopago);

    if (index > -1){
        structures.mediospago[index].descripcion = jsonmed.descripcion;
        console.log(`despues: ${JSON.stringify(structures.mediospago)}`);    
        
        res.send('Petición exitosa');
    }else{
        res.status(404).send('Código no encontrado')
    }
});
/**
 * @swagger
 * /mediopago:
 *  delete:
 *    summary: Elimina medio de pago
 *    description: Permite eliminar un medio de pago (sólo usuario Admin).
 *    consumes:
 *    - "application/json"
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    - name: body
 *      description: Cuerpo de un medio de pago.
 *      in: body
 *      required: true
 *      type: string
 *      example: {codmediopago: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Petición exitosa
 *      404:
 *        description: Código no encontrado
 */
 server.delete('/mediopago', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {

    const jsonmed = req.body;

    let index = structures.mediospago.findIndex( (med) => med.codmediopago === jsonmed.codmediopago);
    console.log(index);

    if (index > -1){
        structures.mediospago.splice(index, 1);

        console.log(`despues: ${JSON.stringify(structures.mediospago)}`);    
        
        res.send('Petición exitosa');
    }else{
        res.status(404).send('Código no encontrado')
    }
});
/**
 * @swagger
 * /mediospago:
 *  get:
 *    summary: Lista medios de pago
 *    description: Obtener un listado con todos los medios de pago (sólo usuario Admin puede invocar).
 *    parameters:
 *    - name: sesionid
 *      description: Id de sesión devuelta por login
 *      in: header
 *      required: true
 *      type: number
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        description: Peticion exitosa
 *
 */
 server.get('/mediospago', chk.validaSesion, chk.validaUsuarioAdmin, (req, res) => {
    
    res.send(JSON.stringify(structures.mediospago));
});







server.listen(puerto, () => {
    console.log(`Servidor en ejecution en el puerto ${puerto}`);
});