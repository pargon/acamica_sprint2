const { Router } = require('express');

function createRouter() {
  const router = Router();

  /**
   * @swagger
   * /paymeths:
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
   *        description: Medio de Pago creado
   *      405:
   *        description: Código existente
   */
   router.post('/', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    res.status(200).json({mensaje:"Medio de Pago creado"});
   });
  /**
   * @swagger
   * /paymeths:
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
   *        description: Medio de Pago actualizado
   *      404:
   *        description: Código no encontrado
   */
  router.put('/', /*chk.validaSesion, chk.validaUsuarioAdmin, */ async(req, res) => {
    res.status(200).json({mensaje:"Medio de Pago actualizado"});
  });
  /**
   * @swagger
   * /paymeths:
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
   *        description: Medio de Pago actualizado
   *      404:
   *        description: Código no encontrado
   */
  router.delete('/', /*chk.validaSesion, chk.validaUsuarioAdmin,*/ async (req, res) => {
    res.status(200).json({mensaje:"Medio de Pago actualizado"});
  });
  /**
   * @swagger
   * /paymeths/all:
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
  router.get('/todos', /*chk.validaSesion, chk.validaUsuarioAdmin,*/ async (req, res) => {
    const listado = {};
    res.status(200).json(listado);
  });


    /*
  router.get('/', cache, async (req, res) => {
    const PayMeth = getModel('PayMethModel');
    console.time('GET PayMeths');
    const payMeths = await PayMeth.findAll({});
    console.timeEnd('GET PayMeths');
    res.json(payMeths);
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
