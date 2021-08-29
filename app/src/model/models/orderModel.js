const { DataTypes, Model } = require('sequelize');
const {UserModel} = require('./userModel');
const {PayMethModel} = require('./paymethModel');
const {ProductModel} = require('./productModel');
const { OrderDetailModel } = require('./orderDetailModel');

class OrderModel extends Model { }

const createOrderModel = (sequelize) =>{
OrderModel.init({
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userid: {
      type: DataTypes.STRING(40),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'userid'
      }
    },
    codmediopago: {
      type: DataTypes.STRING(40),
      allowNull: true,
      references: {
        model: 'mediopago',
        key: 'codmediopago'
      }
    },
    estado: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    direccion_entrega: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero" },
        ]
      },
      {
        name: "pedidousuario_idx",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "pedidomediopago_idx",
        using: "BTREE",
        fields: [
          { name: "codmediopago" },
        ]
      },
    ]
  })

  OrderModel.belongsTo( UserModel, {foreignKey: {name: 'userid'}});
  OrderModel.belongsTo( PayMethModel, {foreignKey: 'codmediopago'});
  OrderModel.hasMany(ProductModel);
  //OrderModel.belongsToMany( ProductModel, {through: 'pedidoproducto', sourcekey: 'numero', foreignKey:'numeropedido'});
  //ProductModel.belongsToMany(OrderModel, {through: 'pedidoproducto', sourcekey:'codproducto', foreignKey: 'codproducto'});

  return OrderModel;
}

module.exports = {
  createOrderModel,
};
