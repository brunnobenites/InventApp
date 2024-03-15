const inventariosRepository = require("../repositories/inventariosRepository");

async function getInventarios(req, res, next) {
  const id = res.locals.token.id;
  const inventarios = await inventariosRepository.getInventarios(id);
  res.json(inventarios);
}

module.exports = { getInventarios };
