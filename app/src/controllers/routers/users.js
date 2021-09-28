/* eslint-disable max-len */
const { Router } = require('express');
const CryptoJS = require('crypto-js');
const db = require('../../model');
const { chkNewUser, login, chkAdmin } = require('../midds/users');
const { newToken, chkToken } = require('../midds/token');

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
 *        description: Usuario Creado.
 *        type: string
 *        example: { nombre: String, apellido: String, mail: String, direccionenvio: String, telefono: String, userid: String, password: String, direcciones: {direccion: String}}
 */
  router.post('/', chkNewUser, async (req, res) => {
    const { CRYPTO_KEY } = process.env;
    const User = db.getModel('UserModel');
    const Address = db.getModel('AddressModel');
    const {
      userid,
      nombre,
      apellido,
      mail,
      telefono,
      password,
      direcciones,
    } = req.body;
    const direcc = direcciones
    // encripta pass
    const passwordCryp = CryptoJS.AES.encrypt(password, CRYPTO_KEY).toString();

    const isAdmin = (userid === 'admin');

    try {
      // inserta base
      const newUser = await User.create({
        userid,
        nombre,
        apellido,
        mail,
        telefono,
        password: passwordCryp,
        admin: isAdmin,
        addresses: direcciones,
      }, {
        include: [Address],
      });

      // // agrega direcciones al usuario
      // direcciones.forEach(element => {
      //   const direccion = element.direccion;
      //   newUser.addAddress(direccion);
      // });

      // guardo la order
      await newUser.save();

      // devuelvo ok el endpoint
      res.status(200).json(newUser);

    } catch (error) {
      global.console.log(error);
      res.status(406).json(error);
    }
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
  router.post('/login', login, newToken, async (req, res) => {
    if (req.token) {
      return res.status(200).json({ token: req.token });
    }
    return res.status(404);
  });

  router.get('/', chkToken, chkAdmin, async (req, res) => {
    const User = db.getModel('UserModel');
    const Address = db.getModel('AddressModel');
    global.console.time('GET Users');
    const users = await User.findAll({ include: [Address] });
    global.console.timeEnd('GET Users');
    res.json(users);
  });

  return router;
}

module.exports = {
  createRouter,
};
