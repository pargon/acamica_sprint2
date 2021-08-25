const { DataTypes, Model } = require('sequelize');

class ProductModel extends Model { }

const createProductModel = ( sequelize) =>
ProductModel.init({
    codproducto: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codproducto" },
        ]
      },
    ]
  });

module.exports ={
  createProductModel
};
