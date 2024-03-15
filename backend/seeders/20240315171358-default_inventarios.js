"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("inventarios", [
      {
        name: "Vias Estruturantes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acesso as Moreninhas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("inventarios", null, {});
  },
};
