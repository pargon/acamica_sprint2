const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/connect');

class PayMethModel extends Model { }

PayMethModel.init({
    codmediopago: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mediopago',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codmediopago" },
        ]
      },
    ]
  })

module.exports = PayMethModel;