const { Router } = require("express");
const { verifyJWT } = require("../midd/auth");

function crtHomeRouter(){
  const router = Router();
  
  router.get('/', verifyJWT, (req, res) =>{
    res
      .status(200)
      .json({message:"all is fine"});
  });

  router.post('/private', verifyJWT, (req, res) =>{
    res
      .status(200)
      .json({message:"all is fine"});
  });


  router.post('/login', verifyJWT, (req, res) =>{
    res
      .status(200)
      .json({message:"all is fine"});

  });

  return router;

};

module.exports ={ crtHomeRouter};