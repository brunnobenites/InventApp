import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { getAllArvores, deleteArvore } from "../../services/ArvoresService";
import { getAllInventarios } from "../../services/InventariosService";
import NewArvoreButton from "./NewArvoreButton";
import NewArvoreModal from "./NewArvoreModal";
import UpdateArvoreModal from "./UpdateArvoreModal";
import Pagination from "../../components/Pagination/Pagination";

/**
 * props:
 * - data
 * - onEditClick
 * - onDeleteClick
 */

function Arvores() {
  const history = useHistory();
  const [arvores, setArvores] = useState([]);
  const [inventarios, setInventarios] = useState([]); // Adicione um estado para os inventários
  const [selectedArvoreId, setSelectedArvoreId] = useState(""); // Adicione um estado para a árvore selecionada [1/2
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  function getPage(location) {
    const page = new URLSearchParams(location.search).get("page");
    return page !== null && page !== undefined ? page : 1;
  }

  const location = useLocation();
  const [page, setPage] = useState(getPage(history.location));

  useEffect(() => {
    setPage(getPage(location));
  }, [location]);

  function onEditClick(id_arvore) {
    setSelectedArvoreId(id_arvore);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dataArvores, total } = await getAllArvores(page);
        const dataInventarios = await getAllInventarios(); // Busque os inventários aqui
        setArvores(dataArvores);
        setInventarios(dataInventarios); // Defina o estado dos inventários aqui
        setCount(total); // Atualize o valor de count aqui
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
  }, [history, page]);

  const onDeleteClick = async (id_arvore) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir esta árvore?"
    );
    if (confirmDelete) {
      try {
        await deleteArvore(id_arvore);
        console.log("Árvore excluída com sucesso!");
        // Atualizar a lista de árvores após a exclusão
        const { data: dataArvores, total } = await getAllArvores(page);
        setArvores(dataArvores);
        setCount(total);
      } catch (err) {
        console.error(
          "Erro ao excluir árvore:",
          err.response ? err.response.data : err.message
        );
      }
    }
  };

  // Função para atualizar a lista de árvores
  const updateArvoresList = async () => {
    try {
      const { data: dataArvores, total } = await getAllArvores(page);
      setArvores(dataArvores);
      setCount(total);
      // Se a nova "arvore" foi inserida, navegar para a última página
      setPage(Math.ceil(total / 10));
    } catch (error) {
      setError("Erro ao atualizar lista de árvores.");
    }
  };

  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Árvores</h1>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <NewArvoreButton />
          <div className="input-group ms-auto fmxw-200 ">
            <span className="input-group-text">
              <svg
                className="icon icon-xs"
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
              className="form-control"
              placeholder="Pesquisar"
            ></input>
          </div>
        </div>
        <div>
          <div style={{ height: "10px" }}></div>
        </div>
        <div className="card card-body border-0 shadow table-wrapper table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="border-gray-200">Ações</th>
                <th className="border-gray-200">Id</th>
                <th className="border-gray-200">ID - Inventário</th>
                <th className="border-gray-200">Tag</th>
                <th className="border-gray-200">Espécie</th>
                <th className="border-gray-200">Endereço</th>
                <th className="border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {arvores && arvores.length ? (
                arvores.map((arvore) => {
                  const inventario = inventarios.find(
                    (inventario) =>
                      inventario.id_inventario === arvore.id_inventario
                  );
                  const id_arvore = arvore.id_arvore;
                  return (
                    <tr key={arvore.id_arvore}>
                      <td>
                        <button
                          id={"edit"}
                          type="button"
                          className="btn btn-secondary btn-xs ms-2"
                          tittle="Editar esta Árvore"
                          data-bs-toggle="modal"
                          data-bs-target="#modalUpdateArvore"
                          onClick={() => onEditClick(arvore.id_arvore)}
                        >
                          <svg
                            className="icon icon-xs"
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            ></path>
                          </svg>
                        </button>
                        <button
                          id={`delete${id_arvore}`}
                          type="button"
                          className="btn btn-danger btn-xs ms-2"
                          tittle="Deletar esta Árvore"
                          onClick={() => onDeleteClick(id_arvore)}
                        >
                          <svg
                            className="icon icon-xs"
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
                      <td>{arvore.id_arvore}</td>
                      <td>
                        {arvore.id_inventario} -{" "}
                        {inventario
                          ? inventario.name
                          : "Inventário não encontrado"}
                      </td>
                      <td>{arvore.n_tag}</td>
                      <td>{arvore.especie}</td>
                      <td>{arvore.endereco}</td>
                      <td>STATUS</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">Nenhuma árvore encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination count={count} size={10} max={10} currentPage={page} />
        </div>
      </main>
      <NewArvoreModal
        updateArvoresList={updateArvoresList}
        setPage={setPage}
        getAllArvores={getAllArvores}
      />
      <UpdateArvoreModal id_arvore={selectedArvoreId} />
    </React.Fragment>
  );
}

export default Arvores;
