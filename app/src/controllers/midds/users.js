const CryptoJS = require('crypto-js');
const db = require('../../model');

async function chkNewUser(req, res, next) {
  const User = db.getModel('UserModel');
  // buscar por mail
  const current = await User.findOne({
    where: {
      mail: req.body.mail,
    },
  });
  if (current) {
    res
      .status(403)
      .send({ message: 'Ya existe registro de ese mail' });
  } else {
    // buscar por userid
    const current2 = await User.findOne({
      where: {
        userid: req.body.userid,
      },
    });
    if (current2) {
      res
        .status(403)
        .send({ message: 'Ya existe registro de ese usuario' });
    } else {
      next();
    }
  }
}

async function login(req, res, next) {
  const { CRYPTO_KEY } = process.env;
  const User = db.getModel('UserModel');
  // buscar por userid
  const current = await User.findOne({
    where: {
      userid: req.body.userid,
    },
  });
  if (current) {
    // desencripta pass guardado
    const bytesPass = CryptoJS.AES.decrypt(current.password, CRYPTO_KEY);
    const password = bytesPass.toString(CryptoJS.enc.Utf8);
     
    // coinciden pass encriptados
    if (password === req.body.password) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Password incorrecto' });
    }
  } else {
    res
      .status(404)
      .send({ message: 'Usuario no encontrado' });
  }
}

async function chkAdmin(req, res, next) {
  const userquery = req.user.userid;
  const User = db.getModel('UserModel');
  // buscar por userid
  const current = await User.findOne({
    where: {
      userid: userquery,
    },
  });
  if (current) {
    if (current.admin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Usuario no es Administrador' });
    }
  } else {
    res
      .status(404)
      .json({ message: 'Usuario no encontrado' });
  }
}

module.exports = {
  chkNewUser,
  login,
  chkAdmin,
};
