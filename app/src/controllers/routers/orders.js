const { Router } = require('express');
const { getModel } = require('../../model');
const { ProductModel } = require('../../model/models/productModel');

function createRouter() {
  const router = Router();

  /**
   * @swagger
   * /:
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
   *        description: Pedido creado
   */
  router.post('/', /*chk.validaSesion, chk.validaDetallePedido,*/ async (req, res) => {
    
    res.status(200).json({mensaje:"Pedido creado"});
  });
  /**
   * @swagger
   * /:
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
   *        description: Pedido actualizado
   *      404:
   *        description: Pedido no encontrado
   *      405:
   *        description: Usuario no es propietario del numero de pedido
   *      406:
   *        description: El Pedido debe estar Pendiente
   */
  router.put('/', /* chk.validaSesion, chk.validaModificaPedido, chk.validaDetallePedido, */ async (req, res) => {
    res.status(200).json({mensaje:"Pedido actualizado"});
  });
  /**
   * @swagger
   * /mis:
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
  router.get('/mis', /*chk.validaSesion, */ async (req, res) => {
    const listado = {};
    res.status(200).json(listado);
  });
  /**
   * @swagger
   * /todos:
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
  router.get('/todos', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async (req, res) => {
    const listado = {};
    res.status(200).json(listado);
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
   *        description: Peticion actualizado
   *      404:
   *        description: Pedido no encontrado
   */
  router.put('/estado', /*chk.validaSesion, chk.validaUsuarioAdmin, chk.validaModificaPedido, */ async(req, res) => {
    res.status(200).json({mensaje:"Pedido actualizado"});
  });

/*
  router.get('/', cache, async (req, res) => {
    const Order = getModel('OrderModel');
    console.time('GET Orders');
    const orders = await Order.findAll({ include: [{model:ProductModel}]});
    console.timeEnd('GET Orders');
    res.json(orders);
  });

  router.post('/', cleanCache, async (req, res) => {
    const article = req.body;
    const Post = getModel('Post');
    await Post.create(article);
    res.json(article);
  });
*/
  return router;
}

module.exports = {
  createRouter,
};
