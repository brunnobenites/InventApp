const arvoresModel = require("../models/arvoresModel");

async function getArvore(id_arvore) {
  try {
    const arvore = await arvoresModel.findByPk(id_arvore);
    if (!arvore) {
      throw new Error("Árvore não encontrada.");
    }
    return arvore;
  } catch (error) {
    throw new Error("Erro ao buscar árvore do banco de dados.");
  }
}

async function getAllArvores() {
  try {
    const arvores = await arvoresModel.findAll();
    return arvores;
  } catch (error) {
    throw new Error("Erro ao buscar todas as árvores do banco de dados.");
  }
}

async function insertArvore(newArvore) {
  try {
    console.log("Dados da árvore a ser inserida:", newArvore);
    const arvore = await arvoresModel.create(newArvore);
    console.log("Árvore criada:", arvore);
    return arvore;
  } catch (error) {
    console.error("Erro ao inserir árvore:", error);
    throw new Error("Erro ao inserir árvore no banco de dados.");
  }
}


async function deleteArvore(id_arvore) {
  try {
    const arvore = await arvoresModel.findByPk(id_arvore);
    if (!arvore) {
      throw new Error("Árvore não encontrada.");
    }
    await arvore.destroy();
    return { message: "Árvore excluída com sucesso." };
  } catch (error) {
    throw new Error("Erro ao excluir árvore do banco de dados.");
  }
}

module.exports = { getArvore, getAllArvores, insertArvore, deleteArvore };
