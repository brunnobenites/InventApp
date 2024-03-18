const arvoresModel = require("../models/arvoresModel");

function getArvore(id_arvore) {
  return arvoresModel.findByPk(id_arvore);
}

function getAllArvores() {
  return arvoresModel.findAll();
}

async function insertArvore(newArvore) {
  try {
    const arvore = await arvoresModel.create(newArvore);
    return arvore;
  } catch (error) {
    throw new Error("Erro ao inserir árvore no banco de dados.");
  }
}

async function deleteArvore(id_arvore) {
  try {
    const arvore = await arvoresModel.findByPk(id_arvore);
    if (!arvore) {
      throw new Error("Árvore não encontrada.");
    }
    await arvore.destroy({ where: id_arvore });
    return { message: "Árvore excluída com sucesso." };
  } catch (error) {
    throw new Error("Erro ao excluir árvore do banco de dados.");
  }
}

module.exports = { getArvore, getAllArvores, insertArvore, deleteArvore };
