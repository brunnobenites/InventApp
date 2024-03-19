const inventariosModel = require("../models/inventariosModel");

function getInventarios(id_inventario) {
  return inventariosModel.findByPk(id_inventario);
}

function getAllInventarios() {
  return inventariosModel.findAll();
}

async function insertInventario(newInventario) {
  try {
    const inventario = await inventariosModel.create(newInventario);
    return inventario;
  } catch (error) {
    throw new Error("Erro ao inserir inventário no banco de dados.");
  }
}

async function deleteInventario(id_inventario) {
  try {
    const inventario = await inventariosModel.findByPk(id_inventario);
    if (!inventario) {
      throw new Error("Inventário não encontrado.");
    }
    await inventario.destroy({ where: id_inventario });
    return { message: "Inventário excluído com sucesso." };
  } catch (error) {
    throw new Error("Erro ao excluir inventário do banco de dados.");
  }
}

async function updateInventario(id_inventario, updatedData) {
  try {
    const inventario = await inventariosModel.findByPk(id_inventario);
    if (!inventario) {
      throw new Error("Inventário não encontrado.");
    }
    await inventario.update(updatedData);
    return { message: "Inventário atualizado com sucesso." };
  } catch (error) {
    throw new Error("Erro ao atualizar inventário no banco de dados.");
  }
}

module.exports = {
  getInventarios,
  getAllInventarios,
  insertInventario,
  deleteInventario,
  updateInventario,
};
