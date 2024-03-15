const { get } = require("../app");
const settingsModel = require("../models/settingsModel");

function getSettingsByEmail(email) {
  return settingsModel.findOne({ where: { email } });
}

module.exports = { getSettingsByEmail };
