const { Router } = require('express');

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
   *      example: {codproducto: String, descripcion: String, precio: Number}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto creado
   *      405:
   *        description: Código existente
   */
  router.post('/', /* chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    res.status(200).json({mensaje:"Producto creado"});
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
   *      example: {codproducto: String, descripcion: String, precio: Number}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto actualizado
   *      404:
   *        description: Código no encontrado
   */
  router.put('/', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    res.status(200).json({mensaje:"Producto actualizado"});
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
   *      example: {codproducto: String}
   *    produces:
   *    - "application/json"
   *    responses:
   *      200:
   *        description: Producto eliminado
   *      404:
   *        description: Código no encontrado
   */
  router.delete('/', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    res.status(200).json({mensaje:"Prodcuto eliminado"});
  });
  /**
   * @swagger
   * /products/all:
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
  router.get('/todos', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    const listado = {};
    res.status(200).json(listado);
  });

  /*
  router.get('/', cache, async (req, res) => {
    const Product = getModel('ProductModel');
    console.time('GET Products');
    const products = await Product.findAll({});
    console.timeEnd('GET Products');
    res.json(products);
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
