const Sequelize = require("sequelize");
const database = require("../db");

const inventariosModel = database.define("inventarios", {
  id_inventario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = inventariosModel;
