import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  updateInventario,
  getInventarios,
} from "../../services/InventariosService";

function UpdateInventarioModal({
  selectedInventarioId,
  updateInventariosList,
}) {
  const history = useHistory();
  const btnClose = useRef("");
  const [newInventario, setNewInventario] = useState("");
  const [status, setStatus] = useState("EM ANDAMENTO"); // Estado para o status do inventário
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedInventarioId) {
        try {
          const data = await getInventarios(selectedInventarioId);
          setNewInventario(data.name);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            history.push("/");
          } else if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        }
      }
    };
    fetchData();
  }, [history, selectedInventarioId]);

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      const inventario = { name: newInventario, status }; // Incluir o status no objeto inventario
      const response = await updateInventario(selectedInventarioId, inventario);
      console.log("Resposta do servidor: ", response);
      // Fechar a modal
      btnClose.current.click();
      // Redirecionar para a página /inventarios
      updateInventariosList();
    } catch (error) {
      setError(error.message);
    }
  }

  function onInputChange(event) {
    setNewInventario(event.target.value);
  }

  function onStatusChange(event) {
    setStatus(event.target.value);
  }

  return (
    <div
      className="modal fade"
      id="modalUpdateInventario"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Atualizar Inventário</p>
            <button
              ref={btnClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group mb-2">
              <label htmlFor="nome">Nome do Inventário:</label>
              <input
                className="form-control"
                id="nome"
                type="text"
                placeholder="Nome do Inventário"
                value={newInventario}
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="status">Status do Inventário:</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={onStatusChange}
              >
                <option value="EM ANDAMENTO">Em Andamento</option>
                <option value="FINALIZADO">Finalizado</option>
              </select>
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

export default UpdateInventarioModal;
