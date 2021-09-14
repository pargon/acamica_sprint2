const chalk = require('chalk');
const db = require('../index');

// const client = redis.createClient({
//   host: '127.0.0.1',
//   port: 6379,
// });
// client.on('error', (error) => {
//   console.error(error);
// });

function makeKey(req) {
  return `${req.method}_${req.baseUrl}`;
}

function cache(req, res, next) {
  const client = db.getModel('Redis');

  // arma key con pedido y token
  const key = makeKey(req);
  console.log(chalk.blue(`cache ${JSON.stringify(key)}`));

  // recupera cache
  client.get(key, (error, data) => {
    if (error) throw error;

    if (data !== null) {
      // retorna lo guardado
      res.status(200).send(data);
    } else {
      // si hay error, sigue para que recupere en DB
      next();
    }
  });
  next();
}

async function storeObjectInCache(req, value) {
  const client = db.getModel('Redis');

  const key = makeKey(req);
  const jsonValue = JSON.stringify(value);
  console.log(chalk.greenBright(`${key} ${jsonValue}`));
  await client.set(key, jsonValue);
}

function invalidateCache(req) {
  const client = db.getModel('Redis');
  
  const key = makeKey(req);
  client.DEL(key);
}

module.exports = {
  cache,
  storeObjectInCache,
  invalidateCache,
};
