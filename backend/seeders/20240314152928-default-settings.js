"use strict";
const bcrypt = require("bcryptjs");
require("dotenv").config(); 

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("settings", [
      {
        email: process.env.DEFAULT_SETTINGS_EMAIL,
        password: bcrypt.hashSync(process.env.DEFAULT_SETTINGS_PWD),
        departament: "SISEP",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("settings", null, {});
  },
};
