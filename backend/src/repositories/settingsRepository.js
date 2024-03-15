const settingsModel = require("../models/settingsModel");
const bcrypt = require("bcryptjs");

function getSettingsByEmail(email) {
  return settingsModel.findOne({ where: { email } });
}

function getSettings(id) {
  return settingsModel.findOne({ where: { id } });
}

async function updateSettings(id, newSettings) {
  const currentSettings = await getSettings(id);
  if (newSettings.email !== currentSettings.email)
    currentSettings.email = newSettings.email;

  if (newSettings.password)
    currentSettings.password = bcrypt.hashSync(newSettings.password);

  if (newSettings.departament !== currentSettings.departament)
    currentSettings.departament = newSettings.departament;

  if (newSettings.phone !== currentSettings.phone)
    currentSettings.phone = newSettings.phone;

  await currentSettings.save();
}

module.exports = { getSettingsByEmail, getSettings, updateSettings };
