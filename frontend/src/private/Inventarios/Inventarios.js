import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import {
  deleteInventario,
  getAllInventarios,
} from "../../services/InventariosService";
import NewInventarioButton from "../Inventarios/NewInventarioButton";
import NewInventarioModal from "./NewInventarioModal";
import UpdateInventarioModal from "./UpdateInventarioModal";

function Inventarios() {
  const history = useHistory();
  const [inventarios, setInventarios] = useState([]);
  const [selectedInventarioId, setSelectedInventarioId] = useState(null); // Adicione um estado para a árvore selecionada [1/2
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInventarios();
        setInventarios(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          history.push("/");
        } else if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [history]);

  const onDeleteClick = async (id_inventario) => {
    try {
      await deleteInventario(id_inventario);
      console.log("Inventário excluído com sucesso!");
      // Atualizar a lista de árvores após a exclusão
      const dataInventarios = await getAllInventarios();
      setInventarios(dataInventarios);
    } catch (err) {
      console.error(
        "Erro ao excluir inventário:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const onEditClick = (id_inventario) => {
    setSelectedInventarioId(id_inventario);
  }; // Adicione um callback para o evento de clique no botão de editar

  const updateInventariosList = async () => {
    try {
      const dataInventarios = await getAllInventarios();
      setInventarios(dataInventarios);
    } catch (error) {
      setError("Erro ao atualizar lista de inventários.");
    }
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Inventários</h1>
          </div>
        </div>
        <div class="btn-toolbar mb-2 mb-md-0">
          <NewInventarioButton />
          <div class="input-group ms-auto fmxw-200 ">
            <span class="input-group-text">
              <svg
                class="icon icon-xs"
                x-description="Heroicon name: solid/search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Pesquisar"
            ></input>
          </div>
        </div>
        <div>
          <div style={{ height: "10px" }}></div>
        </div>
        <div class="card card-body border-0 shadow table-wrapper table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="border-gray-200">Ação</th>
                <th class="border-gray-200">Id</th>
                <th class="border-gray-200">Nome</th>
                <th class="border-gray-200">Data</th>
              </tr>
            </thead>
            <tbody>
              {inventarios && inventarios.length ? (
                inventarios.map((inventario) => (
                  <tr key={inventario.id_inventario}>
                    <td>
                      <button
                        id={"edit"}
                        type="button"
                        className="btn btn-secondary btn-xs ms-2"
                        tittle="Editar este Inventário"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUpdateInventario"
                        onClick={() => onEditClick(inventario.id_inventario)}
                      >
                        <svg
                          className="icon icon-xs"
                          data-slot="icon"
                          fill="none"
                          stroke-width="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          ></path>
                        </svg>
                      </button>
                      <button
                        id={`delete${inventario.id_inventario}`}
                        type="button"
                        className="btn btn-danger btn-xs ms-2"
                        tittle="Deletar esta Árvore"
                        onClick={() => onDeleteClick(inventario.id_inventario)}
                      >
                        <svg
                          className="icon icon-xs"
                          a
                          data-slot="icon"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          ></path>
                        </svg>
                      </button>
                    </td>
                    <td>{inventario.id_inventario}</td>
                    <td>{inventario.name}</td>
                    <td>{formatarData(inventario.createdAt)}</td>
                    <td>Ações</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nenhum inventário encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <nav aria-label="Page navigation example">
              <ul class="pagination mb-0">
                <li class="page-item">
                  <a class="page-link" href="#">
                    Anterior
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    4
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    5
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Próxima
                  </a>
                </li>
              </ul>
            </nav>
            <div class="fw-normal small mt-4 mt-lg-0">
              Visualizando <b>5</b> de <b>25</b> entradas
            </div>
          </div>
        </div>
      </main>
      <NewInventarioModal updateInventariosList={updateInventariosList} />
      <UpdateInventarioModal
        updateInventariosList={updateInventariosList}
        selectedInventarioId={selectedInventarioId}
      />
    </React.Fragment>
  );
}

export default Inventarios;
