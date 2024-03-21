import axios from "axios";

const ARVORES_URL = `${process.env.REACT_APP_API_URL}/arvores`;

export async function getArvore(id_arvore) {
  let arvoreUrl = ARVORES_URL;
  if (id_arvore !== undefined) {
    arvoreUrl += `/${id_arvore}`;
  }
  const response = await axios.get(arvoreUrl);
  return response.data;
}

export async function getAllArvores(page = 1) {
  const response = await axios.get(`${ARVORES_URL}?page=${page}`);
  return { data: response.data.arvores, total: response.data.total };
}

export async function insertArvore(newArvore) {
  try {
    const response = await axios.post(ARVORES_URL, newArvore);
    console.log("Resposta da requisição POST:", response);
    return response; // Retornar a resposta completa, incluindo o status
  } catch (error) {
    console.log("Erro na requisição POST:", error.response); // Log do erro para depuração
    throw new Error("Erro ao inserir árvore no banco de dados.");
  }
}

export async function deleteArvore(id_arvore) {
  try {
    const response = await axios.delete(`${ARVORES_URL}/${id_arvore}`);
    console.log("Resposta da requisição DELETE:", response);
    return response.data; // Retorne apenas os dados da resposta
  } catch (error) {
    console.log("Erro na requisição DELETE:", error.response); // Log do erro para depuração
    throw new Error("Erro ao excluir árvore do banco de dados.");
  }
}

export async function updateArvore(id_arvore, updatedArvore) {
  try {
    const arvoreUrl = `${ARVORES_URL}/${id_arvore}`;
    const response = await axios.patch(arvoreUrl, updatedArvore);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar árvore no banco de dados.");
  }
}
