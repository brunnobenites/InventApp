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

export async function getAllArvores() {
  const response = await axios.get(ARVORES_URL);
  return response.data;
}

export async function insertArvore(newArvore) {
  try {
    const response = await axios.post(ARVORES_URL, newArvore);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao inserir árvore no banco de dados.");
  }
}
