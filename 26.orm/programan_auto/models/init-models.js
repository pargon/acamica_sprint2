var DataTypes = require("sequelize").DataTypes;
var _ciudad = require("./ciudad");
var _estadocivil = require("./estadocivil");
var _estudiante = require("./estudiante");

function initModels(sequelize) {
  var ciudad = _ciudad(sequelize, DataTypes);
  var estadocivil = _estadocivil(sequelize, DataTypes);
  var estudiante = _estudiante(sequelize, DataTypes);

  estudiante.belongsTo(ciudad, { as: "idCiudad_ciudad", foreignKey: "idCiudad"});
  ciudad.hasMany(estudiante, { as: "estudiantes", foreignKey: "idCiudad"});
  estudiante.belongsTo(estadocivil, { as: "idEstadoCivil_estadocivil", foreignKey: "idEstadoCivil"});
  estadocivil.hasMany(estudiante, { as: "estudiantes", foreignKey: "idEstadoCivil"});

  return {
    ciudad,
    estadocivil,
    estudiante,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
