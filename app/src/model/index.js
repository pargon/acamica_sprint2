const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const chalk = require('chalk');
const redis = require('redis');
const { createModel: createProductModel } = require('./models/product');
const { createModel: createUserModel } = require('./models/user');
const { createModel: createPayMethModel } = require('./models/paymeth');
const { createModel: createOrderModel } = require('./models/order');

const models = {};

async function connect(host, port, username, password, database) {
  const conn = new Sequelize({
    database,
    username,
    password,
    host,
    port,
    dialect: 'mariadb',
    timestamps: false,
  });

  // guarda modelos
  models.UserModel = createUserModel(conn);
  models.ProductModel = createProductModel(conn);
  models.PayMethModel = createPayMethModel(conn);
  models.OrderModel = createOrderModel(conn);

  // relacion entre modelos
  models.OrderModel.belongsTo(models.UserModel, { targetKey: 'userid', foreignKey: 'userUserid' });
  models.OrderModel.belongsTo(models.PayMethModel, { targetKey: 'descripcion', foreignKey: 'paymethDescripcion' });

  const OrderProduct = conn.define('orderproduct', {
    cantidad: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  models.OrderModel.belongsToMany(models.ProductModel, { through: OrderProduct });
  models.ProductModel.belongsToMany(models.OrderModel, { through: OrderProduct });

  try {
    await conn.authenticate();
    await conn.sync();
    global.console.log(chalk.cyan('DB: Connect Success'));
  } catch (err) {
    global.console.log(chalk.cyan('DB: Error connect', err));
  }
}

function redisConn() {
  try {
    const client = redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    });

    models.Redis = client;

    global.console.log(chalk.cyan('Redis: Connect Success'));
  } catch (err) {
    global.console.log(chalk.cyan('Redis: Error connect', err));
  }
}

function getModel(name) {
  if (!models[name]) {
    global.console.log(chalk.magenta(`No existe model ${name}`));
    return null;
  }
  return models[name];
}

module.exports = {
  connect,
  getModel,
  redisConn,
};
