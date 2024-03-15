const inventariosModel = require("../models/inventariosModel");

function getInventarios(id_inventario) {
  return inventariosModel.findOne({ where: { id_inventario } });
}

module.exports = { getInventarios };
