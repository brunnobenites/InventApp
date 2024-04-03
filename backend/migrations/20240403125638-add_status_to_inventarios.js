"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("inventarios", "status", {
      type: Sequelize.STRING,
      allpwNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("inventarios", "status");
  },
};
