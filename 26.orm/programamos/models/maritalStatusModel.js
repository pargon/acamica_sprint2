const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/connect');

class MaritalStatusModel extends Model { }

MaritalStatusModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'estadoCivil',
  tableName: 'estadoCivil',
  timestamps: false
})

module.exports = MaritalStatusModel;
