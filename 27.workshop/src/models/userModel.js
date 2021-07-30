const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/connect');

class UserModel extends Model { }

UserModel.init({
    userid: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    direenvio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  })

module.exports = UserModel;