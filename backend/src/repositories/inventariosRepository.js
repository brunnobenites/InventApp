const inventariosModel = require("../models/inventariosModel");

function getInventarios(id_inventario) {
  return inventariosModel.findByPk(id_inventario);
}

function getAllInventarios() {
  return inventariosModel.findAll();
}

module.exports = { getInventarios, getAllInventarios };

