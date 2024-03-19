import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { insertInventario } from "../../services/InventariosService";

function NewInventarioModal() {
  const history = useHistory();
  const btnClose = useRef("");
  const [newInventario, setNewInventario] = useState("");
  const [error, setError] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      const inventario = { name: newInventario };
      const response = await insertInventario(inventario);
      console.log("Resposta do servidor: ", response);
      // Fechar a modal
      btnClose.current.click();
      // Redirecionar para a página /inventarios
    } catch (error) {
      setError(error.message);
    }
  }

  function onInputChange(event) {
    setNewInventario(event.target.value);
  }

  return (
    <div
      className="modal fade"
      id="modalNewInventario"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Novo Inventário</p>
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
                <input
                  className="form-control"
                  id="nome"
                  type="nome"
                  placeholder="Nome do Inventário"
                  value={newInventario}
                  onChange={onInputChange}
                />
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

export default NewInventarioModal;
