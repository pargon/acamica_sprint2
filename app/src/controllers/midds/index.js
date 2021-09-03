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
    res.status(403).send('Ya existe registro de ese mail');
  } else {
    // buscar por userid
    const current2 = await User.findOne({
      where: {
        userid: req.body.userid,
      },
    });
    if (current2) {
      res.status(403).send('Ya existe registro de ese usuario');
    } else {
      next();
    }
  }
}

module.exports = {
  chkNewUser,
};
