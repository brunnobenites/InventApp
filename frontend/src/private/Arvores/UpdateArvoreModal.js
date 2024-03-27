import React, { useEffect, useRef, useState } from "react";
import SelectInventario from "../Inventarios/SelectInventario";
import { getArvore } from "../../services/ArvoresService";
import { useHistory } from "react-router-dom";
import { updateArvore } from "../../services/ArvoresService";
import FormCap from "../../components/Cap/Cap";
import FormWithLocation from "../../components/Coordinate/Coordinate";

function UpdateArvoreModal({ id_arvore, id_inventario }) {
  const history = useHistory("");
  const btnClose = useRef("");
  const [newArvore, setNewArvore] = useState({});
  const [error, setError] = useState("");

  function handleInputChange(event) {
    const { id, value } = event.target;
    setNewArvore((prevState) => ({
      ...prevState,
      [id]: value === "" ? null : value,
    }));
  }

  useEffect(() => {
    if (id_arvore) {
      getArvore(id_arvore).then((arvore) => {
        setNewArvore((prevState) => ({ ...prevState, ...arvore }));
      });
    } else {
      setNewArvore((prevState) => ({
        ...prevState,
        id_arvore: "",
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
      }));
    }
  }, [id_inventario, id_arvore]);

  async function onFormSubmit(event) {
    event.preventDefault();
    //Verificar se id_inventario está presente
    if (!newArvore.id_inventario || !id_arvore) {
      setError("ID do inventário não especificado.");
      return;
    }
    // Chamar a função insertArvore apenas se o id_inventario estiver presente
    try {
      await updateArvore(id_arvore, newArvore);
      // Se a requisição for bem sucedida, feche o modal e recarregue a página
      btnClose.current.click();
      history.go(0);
    } catch (error) {
      // Se houver um erro, defina a mensagem de erro
      setError("Erro ao atualizar árvore.");
    }
  }

  return (
    <div
      className="modal fade"
      id="modalUpdateArvore"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <b className="modal-title">ATUALIZAR ÁRVORE</b>
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
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="id_inventario">ID Árvore:</label>
                      <input
                        className="form-control"
                        id="id_arvore"
                        type="number"
                        value={newArvore.id_arvore}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <SelectInventario
                    id_inventario={newArvore.id_inventario}
                    onChange={handleInputChange}
                  />
                </div>
                <li
                  role="separator"
                  className="dropdown-divider mt-2 mb-2 col-12 p-0"
                ></li>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="especie">Espécie:</label>
                      <input
                        className="form-control"
                        id="especie"
                        type="text"
                        placeholder="Espécie da Árvore"
                        value={newArvore.especie || ""}
                        //required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="n_tag">Tag:</label>
                      <input
                        className="form-control"
                        id="n_tag"
                        type="number"
                        placeholder="00"
                        value={newArvore.n_tag || ""}
                        //required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="altura">Altura (m):</label>
                      <input
                        className="form-control"
                        id="altura"
                        type="number"
                        placeholder="00"
                        value={newArvore.altura || ""}
                        //required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <FormCap
                    defaultFields={["cap1"]}
                    handleInputChange={handleInputChange}
                    initialValues={{
                      cap1: newArvore.cap1,
                      cap2: newArvore.cap2,
                      cap3: newArvore.cap3,
                      cap4: newArvore.cap4,
                      cap5: newArvore.cap5,
                      cap6: newArvore.cap6,
                      cap7: newArvore.cap7,
                      cap8: newArvore.cap8,
                      cap9: newArvore.cap9,
                      cap10: newArvore.cap10,
                    }}
                  />
                </div>
                <div className="row"></div>
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
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <FormWithLocation
                  handleInputChange={handleInputChange}
                  latitude={newArvore.latitude}
                  longitude={newArvore.longitude}
                />
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
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
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
              Atualizar e Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateArvoreModal;
