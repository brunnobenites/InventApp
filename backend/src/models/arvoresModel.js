const Sequelize = require("sequelize");
const database = require("../db");

const arvoresModel = database.define("arvores", {
  id_arvore: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_inventario: Sequelize.INTEGER,
  n_tag: Sequelize.INTEGER,
  especie: Sequelize.STRING,
  altura: Sequelize.FLOAT,
  cap1: Sequelize.FLOAT,
  cap2: Sequelize.FLOAT,
  cap3: Sequelize.FLOAT,
  cap4: Sequelize.FLOAT,
  cap5: Sequelize.FLOAT,
  cap6: Sequelize.FLOAT,
  cap7: Sequelize.FLOAT,
  cap8: Sequelize.FLOAT,
  cap9: Sequelize.FLOAT,
  cap10: Sequelize.FLOAT,
  endereco: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  foto1: Sequelize.STRING,
  foto2: Sequelize.STRING,
  justificativa: Sequelize.STRING,
  id_inventario: Sequelize.INTEGER,
  legfoto1: Sequelize.STRING,
  legfoto2: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  //Chave estrangeira para o inventário
});

module.exports = arvoresModel;
