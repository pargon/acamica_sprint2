const { crtHomeRouter }= require('./home');

function loadRouters(server, models){
  setModels(models);

  server.use('/api/v1/home', crtHomeRouter() ); 

};

module.exports= {loadRouters};
