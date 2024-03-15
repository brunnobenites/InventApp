"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const settingsId = await queryInterface.rawSelect(
      "settings",
      { where: {}, limit: 1 },
      ["id"]
    );
    if (!settingsId) {
      return queryInterface.bulkInsert("settings", [
        {
          email: "brunnobenites@gmail.com",
          password: bcrypt.hashSync("badweiser05"),
          departament: "SISEP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("settings", null, {});
  },
};
