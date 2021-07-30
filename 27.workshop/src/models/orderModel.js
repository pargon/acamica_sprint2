const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/connect');
const UserModel = require('../models/userModel');
const PayMethModel = require('../models/paymethModel');
const OrderDetailModel = require('../models/orderDetailModel');

class OrderModel extends Model { }

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
OrderModel.belongsTo( OrderDetailModel, {foreignKey: 'numero'});

module.exports = OrderModel;
