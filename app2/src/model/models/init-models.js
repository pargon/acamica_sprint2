var DataTypes = require("sequelize").DataTypes;
var _mediopago = require("./mediopago");
var _pedido = require("./pedido");
var _pedidoproducto = require("./pedidoproducto");
var _producto = require("./producto");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var mediopago = _mediopago(sequelize, DataTypes);
  var pedido = _pedido(sequelize, DataTypes);
  var pedidoproducto = _pedidoproducto(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  pedido.belongsTo(mediopago, { as: "codmediopago_mediopago", foreignKey: "codmediopago"});
  mediopago.hasMany(pedido, { as: "pedidos", foreignKey: "codmediopago"});
  pedidoproducto.belongsTo(producto, { as: "codproducto_producto", foreignKey: "codproducto"});
  producto.hasMany(pedidoproducto, { as: "pedidoproductos", foreignKey: "codproducto"});
  pedido.belongsTo(usuario, { as: "user", foreignKey: "userid"});
  usuario.hasMany(pedido, { as: "pedidos", foreignKey: "userid"});

  return {
    mediopago,
    pedido,
    pedidoproducto,
    producto,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
