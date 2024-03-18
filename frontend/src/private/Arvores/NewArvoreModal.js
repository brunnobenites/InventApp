import React, { useRef, useState } from "react";
import SelectInventario from "../Inventarios/SelectInventario";

function NewArvoreModal() {
  const btnClose = useRef(null);

  const [error, setError] = useState("");

  function onFormSubmit(event) {
    console.log("click");
  }

  function onInputChange(event) {
    console.log(event);
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
                  <SelectInventario onChange={onInputChange} />
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
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
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
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="altura">Altura:</label>
                      <input
                        className="form-control"
                        id="altura"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap1">CAP1:</label>
                      <input
                        className="form-control"
                        id="cap1"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap2">CAP2:</label>
                      <input
                        className="form-control"
                        id="cap2"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="form-group">
                      <label htmlFor="cap3">CAP3:</label>
                      <input
                        className="form-control"
                        id="cap3"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
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
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="latitude">Latitude:</label>
                      <input
                        className="form-control"
                        id="latitude"
                        type="text"
                        placeholder="ex: -23.5505"
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="longitude">Longitude:</label>
                      <input
                        className="form-control"
                        id="longitude"
                        type="text"
                        placeholder="ex: -46.6333"
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="justificativa">Justificativa:</label>
                      <input
                        className="form-control"
                        id="justificativa"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="foto1">Foto 1:</label>
                      <input
                        className="form-control"
                        id="foto1"
                        type="text"
                        placeholder=""
                        //value={arvores.n_tag || ""}
                        required
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
                        //value={arvores.n_tag || ""}
                        required
                        onChange={onInputChange}
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
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArvoreModal;
