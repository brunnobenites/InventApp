import axios from "axios";

const INVENTARIOS_URL = `${process.env.REACT_APP_API_URL}/inventarios`;

export async function getInventarios(id_inventario) {
  let inventarioUrl = INVENTARIOS_URL;
  if (id_inventario !== undefined) {
    inventarioUrl += `/${id_inventario}`;
  }
  const response = await axios.get(inventarioUrl);
  return response.data;
}

export async function getAllInventarios() {
  const response = await axios.get(INVENTARIOS_URL);
  return response.data;
}

export async function insertInventario(newInventario) {
  try {
    const response = await axios.post(INVENTARIOS_URL, newInventario);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao inserir inventário no banco de dados.");
  }
}

export async function updateInventario(id_inventario, updatedInventario) {
  try {
    const inventarioUrl = `${INVENTARIOS_URL}/${id_inventario}`;
    const response = await axios.patch(inventarioUrl, updatedInventario);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar inventário no banco de dados.");
  }
}

export async function deleteInventario(id_inventario) {
  try {
    const response = await axios.delete(`${INVENTARIOS_URL}/${id_inventario}`);
    console.log("Resposta da requisição DELETE:", response);
    return response.data; // Retorne apenas os dados da resposta
  } catch (error) {
    console.log("Erro na requisição DELETE:", error.response); // Log do erro para depuração
    throw new Error("Erro ao excluir inventário do banco de dados.");
  }
}
