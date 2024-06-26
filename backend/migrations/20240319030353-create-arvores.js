"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("arvores", {
      id_arvore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_inventario: {
        type: DataTypes.INTEGER,
        references: {
          model: 'inventarios', // nome da tabela referenciada
          key: 'id_inventario', // campo da tabela referenciada
        }
      },
      n_tag: DataTypes.INTEGER,
      especie: DataTypes.STRING,
      altura: DataTypes.FLOAT,
      cap1: DataTypes.FLOAT,
      cap2: DataTypes.FLOAT,
      cap3: DataTypes.FLOAT,
      cap4: DataTypes.FLOAT,
      cap5: DataTypes.FLOAT,
      cap6: DataTypes.FLOAT,
      cap7: DataTypes.FLOAT,
      cap8: DataTypes.FLOAT,
      cap9: DataTypes.FLOAT,
      cap10: DataTypes.FLOAT,
      endereco: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      foto1: DataTypes.STRING,
      foto2: DataTypes.STRING,
      justificativa: DataTypes.STRING,
      legfoto1: DataTypes.STRING,
      legfoto2: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("arvores");
  },
};