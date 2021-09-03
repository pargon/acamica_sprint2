const { Router } = require('express');
const db = require('../../model');
const { chkNewUser } = require('../midds');

function createRouter() {
  const router = Router();

  /**
 * @swagger
 * /users:
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
 *      example: { nombre: String, apellido: String, mail: String, direccionenvio: String, telefono: String, userid: String, password: String}
 *    produces:
 *    - "application/json"
 *    responses:
 *      200:
 *        schema: { nombre: String, apellido: String, mail: String, direccionenvio: String, telefono: String, userid: String, password: String}
 *        description: Usuario Creado
 */
  router.post('/', chkNewUser, async (req, res) => {
    const User = db.getModel('UserModel');
    const {
      userid,
      nombre,
      apellido,
      mail,
      direenvio,
      telefono,
      password,
    } = req.body;

    await User.create({
      userid,
      nombre,
      apellido,
      mail,
      direenvio,
      telefono,
      password,
      admin: false,
    });
    const newUser = await User.findOne({
      where: { userid },
    });
    res.status(200).json(newUser);
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
  router.post('/login', async (req, res) => {
    const loginId = 1;
    res.status(200).json({ id: loginId });
  });

  router.get('/', /* cache, */ async (req, res) => {
    const User = db.getModel('UserModel');
    global.console.time('GET Users');
    const users = await User.findAll({});
    global.console.timeEnd('GET Users');
    res.json(users);
  });

  /*  router.post('/', cleanCache, async (req, res) => {
      const article = req.body;
      const Post = db.getModel('Post');
      await Post.create(article);
      res.json(article);
    });
  */
  return router;
}

module.exports = {
  createRouter,
};
