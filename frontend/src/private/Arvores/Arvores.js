import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { getAllArvores } from "../../services/ArvoresService";
import { getAllInventarios } from "../../services/InventariosService";
import NewArvoreButton from "./NewArvoreButton";
import NewArvoreModal from "./NewArvoreModal";

function Arvores() {
  const history = useHistory();
  const [arvores, setArvores] = useState([]);
  const [inventarios, setInventarios] = useState([]); // Adicione um estado para os inventários
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataArvores = await getAllArvores();
        const dataInventarios = await getAllInventarios(); // Busque os inventários aqui
        setArvores(dataArvores);
        setInventarios(dataInventarios); // Defina o estado dos inventários aqui
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

  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Árvores</h1>
          </div>
        </div>
        <div class="btn-toolbar mb-2 mb-md-0">
          <NewArvoreButton />
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
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
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
                <th class="border-gray-200">Id</th>
                <th class="border-gray-200">ID - Inventário</th>
                <th class="border-gray-200">Tag</th>
                <th class="border-gray-200">Espécie</th>
                <th class="border-gray-200">Endereço</th>
                <th class="border-gray-200">Status</th>
                <th class="border-gray-200">Ações</th>
              </tr>
            </thead>
            <tbody>
              {arvores && arvores.length ? (
                arvores.map((arvore) => {
                  const inventario = inventarios.find(
                    (inventario) =>
                      inventario.id_inventario === arvore.id_inventario
                  );
                  return (
                    <tr key={arvore.id_arvore}>
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
                      <td>Status</td>
                      <td>Ações</td>
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
      <NewArvoreModal />
    </React.Fragment>
  );
}

export default Arvores;
