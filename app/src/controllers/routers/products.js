const chalk = require('chalk');
const { Router } = require('express');
const db = require('../../model');
const {
  chkToken, chkAdmin,
} = require('../midds');

function createRouter() {
  const router = Router();

  /**
   * @swagger
   * /products:
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
   *      example: {descripcion: String, precio: Number}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto creado
   *      409:
   *        description: Ya existe el producto
   */
  router.post('/', chkToken, chkAdmin, async (req, res) => {
    // get modelo
    const Product = db.getModel('ProductModel');
    const {
      descripcion,
      precio,
    } = req.body;

    // buscar por descripcion
    const current = await Product.findOne({
      where: {
        descripcion,
      },
    });

    // si encuentra, error
    if (current) {
      res
        .status(409)
        .send({ message: 'Ya existe el producto' });
    } else {
      try {
        // crea nuevo producto
        const newProduct = await Product.create({
          descripcion,
          precio,
        });

        // retorna
        res
          .status(200)
          .json(newProduct);
      } catch (error) {
        res
          .status(501)
          .json(error);
      }
    }
  });
  /**
   * @swagger
   * /products:
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
   *      example: {id: Number, descripcion: String, precio: Number}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto actualizado
   *      404:
   *        description: Producto no encontrado
   *      409:
   *        description: Producto ya existente con esa Descripción
   */
  router.put('/', chkToken, chkAdmin, async (req, res) => {
    // get modelo
    const Product = db.getModel('ProductModel');
    const {
      id,
      descripcion,
      precio,
    } = req.body;

    // buscar por id
    const current = await Product.findOne({
      where: {
        id,
      },
    });
    // si encuentra, actualiza
    if (!current) {
      res
        .status(404)
        .json({ message: 'Producto no encontrado' });
    } else {
      // busca desc
      const currDesc = await Product.findOne({
        where: {
          descripcion,
        },
      });

      // si encuentra misma desc, error
      if (currDesc) {
        res
          .status(409)
          .json({ message: 'Producto ya existente con esa Descripción' });
      } else {
        try {
          // update base
          current.descripcion = descripcion;
          current.precio = precio;
          await current.save();

          res
            .status(200)
            .json(current);
        } catch (error) {
          // si no encuentra, error

          res
            .status(501)
            .json(error);
        }
      }
    }
  });
  /**
   * @swagger
   * /products:
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
   *      example: {id: Number}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto eliminado
   *      404:
   *        description: Producto no encontrado
   */
  router.delete('/', chkToken, chkAdmin, async (req, res) => {
    // get modelo
    const Product = db.getModel('ProductModel');
    const {
      id,
    } = req.body;

    // buscar por id
    const current = await Product.findOne({
      where: {
        id,
      },
    });
    // si no encuentra, error
    if (!current) {
      res
        .status(404)
        .json({ message: 'Producto no encontrado' });
    } else {
      try {
        // delete prod
        await current.destroy();

        res
          .status(200)
          .json({ message: 'Producto eliminado' });
      } catch (error) {
        res
          .status(501)
          .json(error);
      }
    }
  });
  /**
   * @swagger
   * /products:
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
  router.get('/', chkToken, chkAdmin, async (req, res) => {
    const Product = db.getModel('ProductModel');
    const products = await Product.findAll({});
    res
      .status(200)
      .json(products);
  });

  return router;
}

module.exports = {
  createRouter,
};
