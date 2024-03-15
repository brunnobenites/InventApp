import axios from "axios";

const INVENTARIOS_URL = `${process.env.REACT_APP_API_URL}/inventarios/`;

export async function getInventarios(id_inventario) {
  const response = await axios.get(`${INVENTARIOS_URL}${id_inventario}`);
  return response.data;
}
