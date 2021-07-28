const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estudiante', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    idCiudad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ciudad',
        key: 'id'
      }
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idEstadoCivil: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estadocivil',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'estudiante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_Estudiante_Ciudad_idx",
        using: "BTREE",
        fields: [
          { name: "idCiudad" },
        ]
      },
      {
        name: "FK_Estudiante_EstadoCivil_idx",
        using: "BTREE",
        fields: [
          { name: "idEstadoCivil" },
        ]
      },
    ]
  });
};
