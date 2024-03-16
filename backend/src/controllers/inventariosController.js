const inventariosRepository = require("../repositories/inventariosRepository");

async function getInventarios(req, res, next) {
  try {
    const id = req.params.id_inventario;
    if (!id || isNaN(id)) {
      return res.sendStatus(400); // Bad Request
    }
    
    const inventario = await inventariosRepository.getInventarios(id);
    if (!inventario) {
      return res.sendStatus(404); // Not Found
    }
    
    res.json(inventario);
  } catch (error) {
    console.error("Erro ao buscar inventário:", error);
    res.sendStatus(500); // Internal Server Error
  }
}

async function getAllInventarios(req, res, next) {
  try {
    const inventarios = await inventariosRepository.getAllInventarios();
    res.json(inventarios);
  } catch (error) {
    console.error("Erro ao buscar todos os inventários:", error);
    res.sendStatus(500); // Internal Server Error
  }
}

module.exports = { getInventarios, getAllInventarios };

