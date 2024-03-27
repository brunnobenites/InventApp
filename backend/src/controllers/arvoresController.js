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

async function insertArvore(req, res, next) {
  console.log("insertArvore chamada");
  console.log("Corpo da requisição antes do processamento:", req.body); // Log the request body before processing
  console.log("Arquivos recebidos antes do processamento:", req.files); // Log the files before processing

  try {
    let { id_inventario, ...newArvore } = req.body;
    id_inventario = Number(id_inventario); // Converta id_inventario para um número
    console.log("id_inventario convertido para número:", id_inventario); // Log the converted id_inventario

    if (!id_inventario) {
      return res
        .status(400)
        .json({ error: "Campo 'id_inventario' é obrigatório." });
    }

    if (req.files) {
      if (req.files["foto1"]) {
        newArvore.foto1 = req.files["foto1"][0].path;
      }
      if (req.files["foto2"]) {
        newArvore.foto2 = req.files["foto2"][0].path;
      }
    }

    console.log("Corpo da requisição após o processamento:", req.body); // Log the request body after processing
    console.log("Arquivos recebidos após o processamento:", req.files); // Log the files after processing
    console.log("Dados passados para arvoresRepository.insertArvore:", {
      id_inventario,
      ...newArvore,
    }); // Log the data being passed to insertArvore

    const arvore = await arvoresRepository.insertArvore({
      id_inventario,
      ...newArvore,
    });
    res.status(201).json(arvore);
  } catch (error) {
    console.error("Erro ao inserir árvore:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
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
