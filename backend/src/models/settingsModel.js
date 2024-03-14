const Sequelize = require("sequelize");
const database = require("../db");
const { settings } = require("../app");

const settingsModel = database.define(
  "settings",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    departament: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    indexes: [
      {
        fields: ["email"],
        unique: true,
      },
    ],
  }
);

module.exports = settingsModel;
