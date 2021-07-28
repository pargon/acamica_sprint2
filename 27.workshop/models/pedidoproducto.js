const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidoproducto', {
    numeropedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codproducto: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto',
        key: 'codproducto'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedidoproducto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numeropedido" },
          { name: "codproducto" },
        ]
      },
      {
        name: "pedidoproducto_idx",
        using: "BTREE",
        fields: [
          { name: "codproducto" },
        ]
      },
    ]
  });
};
