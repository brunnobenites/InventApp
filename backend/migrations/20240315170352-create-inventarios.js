"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("inventarios", {
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
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("investarios");
  },
};
