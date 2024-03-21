const arvoresRepository = require("../repositories/arvoresRespository");

async function getArvore(req, res, next) {
  try {
    const id = req.params.id_arvore;
    if (!id || isNaN(id)) {
      return res.sendStatus(400); // Bad Request
    }

    const arvore = await arvoresRepository.getArvore(id);
    if (!arvore) {
      return res.sendStatus(404); // Not Found
    }

    res.json(arvore);
  } catch (error) {
    console.error("Erro ao buscar árvore:", error);
    res.sendStatus(500); // Internal Server Error
  }
}

async function getAllArvores(req, res, next) {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const total = await arvoresRepository.countArvores();
    const arvores = await arvoresRepository.getAllArvores(pageSize, skip);
    res.json({ arvores, total });
  } catch (error) {
    console.error("Erro ao buscar todas as árvores:", error);
    res.sendStatus(500); // Internal Server Error
  }
}

async function insertArvore(req, res, next) {
  try {
    const { id_inventario, ...newArvore } = req.body; // Separar o id_inventario dos demais campos
    if (!id_inventario) {
      return res
        .status(400)
        .json({ error: "Campo 'id_inventario' é obrigatório." });
    }

    const arvore = await arvoresRepository.insertArvore({
      id_inventario,
      ...newArvore,
    });
    res.status(201).json(arvore); // Retornar a árvore criada com o status 201 (Created)
  } catch (error) {
    console.error("Erro ao inserir árvore:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function deleteArvore(req, res, next) {
  try {
    const id_arvore = req.params.id_arvore;
    await arvoresRepository.deleteArvore(id_arvore);
    res.json({ message: "Árvore excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir árvore:", error);
    res.status(500).json({ error: "Erro ao excluir árvore." });
  }
}

async function updateArvore(req, res, next) {
  try {
    const id_arvore = req.params.id_arvore;
    const updatedArvore = req.body;
    const arvore = await arvoresRepository.updateArvore(
      id_arvore,
      updatedArvore
    );
    res.json(arvore);
  } catch (error) {
    console.error("Erro ao atualizar árvore:", error);
    res.status(500).json({ error: "Erro ao atualizar árvore." });
  }
}

module.exports = {
  getArvore,
  getAllArvores,
  insertArvore,
  deleteArvore,
  updateArvore,
};
