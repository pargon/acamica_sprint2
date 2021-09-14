/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const { Router } = require('express');
const db = require('../../model');
const { chkToken } = require('../midds/token');
const { chkAdmin } = require('../midds/users');

function createRouter() {
  const router = Router();

  /**
   * @swagger
   * /orders:
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
   *      example: {medioPago: String, direccionEntrega: String, detalle: {producto: String, cantidad: Number}}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Pedido creado
   */
  router.post('/', chkToken, async (req, res) => {
    // get modelo
    const Product = db.getModel('ProductModel');
    const Order = db.getModel('OrderModel');
    const {
      medioPago,
      direccionEntrega,
    } = req.body;

    try {
      // setea variables fijas
      const fecha = Date();
      const estado = 'Pendiente';
      const { userid } = req.user;

      // crea registro pedido
      const order = await Order.create({
        numero: 1,
        fecha,
        paymethDescripcion: medioPago,
        estado,
        direccion_entrega: direccionEntrega,
        userUserid: userid,
      });

      // array de productos
      const detalleProductos = await Promise.all(req.body.detalle.map((elemento) => Product.findOne({
        where: {
          descripcion: elemento.producto,
        },
      })));

      let i = 0;
      for (const { cantidad } of req.body.detalle) {
        // busca producto
        const product = detalleProductos[i];
        if (product) {
          if (cantidad > 0) {
            // agrega detalle tabla
            order.addProduct(product, { through: { cantidad } });
          } else {
            res.status(404).json({ message: 'Cantidad inválida' });
          }
        } else {
          res.status(404).json({ message: 'Producto no encontrado' });
        }

        i += 1;
      }
      // guardo la order
      await order.save();

      // devuelvo ok el endpoint
      res.status(200).json(order);
    } catch (error) {
      global.console.log(error);
      res.status(406).json(error);
    }
  });
  /**
   * @swagger
   * /orders:
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
    res.status(200).json({ mensaje: 'Pedido actualizado' });
  });
  /**
   * @swagger
   * /orders:
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
  router.get('/', chkToken, async (req, res) => {
    const listado = {};
    res.status(200).json(listado);
  });
  /**
   * @swagger
   * /orders/all:
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
   *      403:
   *        description: Invalid Token|
   *      404:
   *        description: Usuario no encontrado
   *
   */
  router.get('/all', chkToken, chkAdmin, async (req, res) => {
    const Order = db.getModel('OrderModel');
    const User = db.getModel('UserModel');
    const Product = db.getModel('ProductModel');
    const PayMeth = db.getModel('PayMethModel');

    const orders = await Order.findAll({ include: [Product, User, PayMeth] });

    res
      .status(200)
      .json(orders);
  });
  /**
   * @swagger
   * /orders/status:
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
  router.put('/status', /* chk.validaSesion, chk.validaUsuarioAdmin, chk.validaModificaPedido, */ async (req, res) => {
    res.status(200).json({ mensaje: 'Pedido actualizado' });
  });

  return router;
}

module.exports = {
  createRouter,
};
