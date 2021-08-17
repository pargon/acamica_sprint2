const jwt = require('jsonwebtoken');
let models = {};

/**
 * Midd para verificar un token
 * @param {*} req peticion
 * @param {*} res respuesta a peticion
 * @param {*} next siguiente handler/middleware
 */
function verifyJWT(req, res, next){
  const JWT_PASS = global.process.env.JWT_PASS;
  const bearer = req.headers.authorization
  const token = (bearer !== undefined? bearer:'')
      .replace('Bearer', '');

  jwt.verify(token, 'shh', JWT_PASS, (error, decoded) =>{
    if(error){
      res
        .status(401)
        .json(
          {message:"Invalid credential"}
        );
    }else{
      next();
    }
  });
};

function authorize(req, res, next){
  try{
    const JWT_PASS = global.process.env.JWT_PASS;
    const token = jwt.sign(userInfo, JWT_PASS);
    next();
  }catch(error){
    res.status(401);
  };
};

function setModels(_models){
  models = _models;
}

module.exports={setModels, verifyJWT, authorize};
