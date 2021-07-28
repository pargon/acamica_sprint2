const { DataTypes, Model } = require('sequelize');
const sequelize = require('../services/connect');

class CityModel extends Model { }

CityModel.init({
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
  modelName: 'ciudad',
  tableName: 'ciudad',
  timestamps: false
})

module.exports = CityModel;