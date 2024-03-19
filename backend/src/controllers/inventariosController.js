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

async function insertInventario(req, res, next) {
  try {
    const newInventario = req.body; // Supondo que o corpo da requisição contém os dados do novo inventário
    const inventario = await inventariosRepository.insertInventario(
      newInventario
    );
    res.status(201).json(inventario); // Retornar o inventário criado com o status 201 (Created)
  } catch (error) {
    console.error("Erro ao inserir inventário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function deleteInventario(req, res, next) {
  try {
    const id_inventario = req.params.id_inventario;
    await inventariosRepository.deleteInventario(id_inventario);
    res.json({ message: "Inventário excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir inventário:", error);
    res.status(500).json({ error: "Erro ao excluir inventário." });
  }
}

async function updateInventario(req, res, next) {
  try {
    const id_inventario = req.params.id_inventario;
    const updatedData = req.body; // Supondo que o corpo da requisição contém os dados atualizados do inventário
    await inventariosRepository.updateInventario(id_inventario, updatedData);
    res.json({ message: "Inventário atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar inventário:", error);
    res.status(500).json({ error: "Erro ao atualizar inventário." });
  }
}

module.exports = {
  getInventarios,
  getAllInventarios,
  insertInventario,
  deleteInventario,
  updateInventario,
};
