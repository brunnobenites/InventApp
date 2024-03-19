const arvoresModel = require("./arvoresModel");
const inventariosModel = require("./inventariosModel");

arvoresModel.belongsTo(inventariosModel, { foreignKey: "id_inventario" });
inventariosModel.hasMany(arvoresModel, { foreignKey: "id_inventario" });

module.exports = {
  arvoresModel,
  inventariosModel,
};
