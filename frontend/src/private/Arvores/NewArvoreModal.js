import React, { useEffect, useRef, useState } from "react";
import SelectInventario from "../Inventarios/SelectInventario";
import { useHistory } from "react-router-dom";
import { insertArvore, getAllArvores } from "../../services/ArvoresService";
import { getAllInventarios } from "../../services/InventariosService";
import FormWithLocation from "../../components/Coordinate/Coordinate";
import FormWithCamera from "../../components/Photos/Photos";

function NewArvoreModal({ id_inventario, updateArvoresList, setPage }) {
  const history = useHistory();
  const btnClose = useRef("");
  const [newArvore, setNewArvore] = useState({});
  const [lastInventarioId, setLastInventarioId] = useState(null); // [1
  const [error, setError] = useState("");

  const setDefaultArvore = (id_inventario) => {
    setNewArvore({
      n_tag: "",
      especie: "",
      altura: "",
      cap1: "",
      cap2: "",
      cap3: "",
      cap4: "",
      cap5: "",
      cap6: "",
      cap7: "",
      cap8: "",
      cap9: "",
      cap10: "",
      endereco: "",
      latitude: "",
      longitude: "",
      foto1: "",
      foto2: "",
      justificativa: "",
      legfoto1: "",
      legfoto2: "",
      id_inventario: id_inventario,
    });
  };

  useEffect(() => {
    async function fetchLastInventarioId() {
      try {
        let inventariosData = await getAllInventarios();
        inventariosData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        if (inventariosData.length > 0) {
          setLastInventarioId(inventariosData[0].id_inventario);
        }
      } catch (error) {
        console.error("Erro ao obter inventários:", error);
      }
    }

    fetchLastInventarioId();
  }, []);

  function onFormSubmit(event) {
    event.preventDefault();

    // Verificar se id_inventario está presente
    if (!newArvore.id_inventario) {
      setError("ID do inventário não especificado.");
      return;
    }

    // Chamar a função insertArvore apenas se o id_inventario estiver presente
    insertArvore({ ...newArvore })
      .then(async (response) => {
        console.log("Resposta do servidor:", response);
        if (response.status === 201) {
          btnClose.current.click();
          // Chamar a função de atualizar a lista passada por prop
          updateArvoresList();
          const { total } = await getAllArvores();
          setPage(Math.ceil(total / 10)); // Navigate to the last page
          setError(""); // Limpa o erro caso haja algum
        } else {
          setError("Erro ao inserir árvore. Por favor, tente novamente.");
        }
      })
      .catch((error) => {
        console.log("Erro na requisição:", error);
        setError(
          "Erro ao enviar requisição. Por favor, tente novamente mais tarde."
        );
      });
  }

  function onInputChange(event) {
    const { id, value, type } = event.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;

    setNewArvore({
      ...newArvore,
      [id]: parsedValue,
    });
  }

  return (
    <div
      className="modal fade"
      id="modalNewArvore"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <b className="modal-title">NOVA ÁRVORE</b>
            <button
              ref={btnClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <SelectInventario
                    onChange={onInputChange}
                    id_inventario={lastInventarioId}
                    selectLast={true}
                  />
                </div>

                <li
                  role="separator"
                  className="dropdown-divider mt-2 mb-2 col-12 p-0"
                ></li>
                <div className="row">
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="n_tag">Tag:</label>
                      <input
                        className="form-control"
                        id="n_tag"
                        type="number"
                        placeholder="00"
                        value={newArvore.n_tag || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-9 mb-2">
                    <div className="form-group">
                      <label htmlFor="especie">Espécie:</label>
                      <input
                        className="form-control"
                        id="especie"
                        type="text"
                        placeholder="Espécie da Árvore"
                        value={newArvore.especie || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="altura">Altura (m):</label>
                      <input
                        className="form-control"
                        id="altura"
                        type="number"
                        placeholder="00"
                        value={newArvore.altura || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap1">CAP1 (cm):</label>
                      <input
                        className="form-control"
                        id="cap1"
                        type="number"
                        placeholder="00"
                        value={newArvore.cap1 || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap2">CAP2 (cm):</label>
                      <input
                        className="form-control"
                        id="cap2"
                        type="number"
                        placeholder="00"
                        value={newArvore.cap2 || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap3">CAP3 (cm):</label>
                      <input
                        className="form-control"
                        id="cap3"
                        type="number"
                        placeholder="00"
                        value={newArvore.cap3 || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="endereco">Endereço:</label>
                      <input
                        className="form-control"
                        id="endereco"
                        type="text"
                        placeholder=""
                        value={newArvore.endereco || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <FormWithLocation />
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="justificativa">Justificativa:</label>
                      <input
                        className="form-control"
                        id="justificativa"
                        type="text"
                        placeholder=""
                        value={newArvore.justificativa || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="foto1">Foto 1:</label>
                      <input
                        className="form-control"
                        id="foto1"
                        type="text"
                        placeholder=""
                        value={newArvore.foto1 || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="foto2">Foto 2:</label>
                      <input
                        className="form-control"
                        id="foto2"
                        type="text"
                        placeholder=""
                        value={newArvore.foto2 || ""}
                        //required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div> */}
                <FormWithCamera />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {error ? (
              <div className="alert alert-danger mt-1 col-7 py-1">{error}</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <button
              className="btn btn-sm btn-primary"
              type="button"
              onClick={onFormSubmit}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArvoreModal;
