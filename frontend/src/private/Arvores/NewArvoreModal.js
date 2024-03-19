import React, { useEffect, useRef, useState } from "react";
import SelectInventario from "../Inventarios/SelectInventario";
import { useHistory } from "react-router-dom";
import {insertArvore} from "../../services/ArvoresService"

function NewArvoreModal({id_inventario}) {
  const history = useHistory();
  const btnClose = useRef(null);
  const [newArvore, setNewArvore] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setNewArvore({
      n_tag: '',
      especie: '',
      altura: '',
      cap1: '',
      cap2: '',
      cap3: '',
      cap4: '',
      cap5: '',
      cap6: '',
      cap7: '',
      cap8: '',
      cap9: '',
      cap10: '',
      endereco: '',
      latitude: '',
      longitude: '',
      foto1: '',
      foto2: '',
      justificativa: '',
      legfoto1: '',
      legfoto2: '',
      id_inventario: id_inventario,
    })
  }, [id_inventario])
  
  
  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      console.log("New Arvore Object:", newArvore); // Imprimir o objeto newArvore antes da requisição
      const response = await insertArvore({ ...newArvore, id_inventario });
      console.log("Resposta do servidor:", response);
      // Verificar se a resposta foi bem-sucedida
      if (response.status === 201) {
        // Sucesso: redirecionar o usuário ou exibir uma mensagem de sucesso
        history.push("/arvores");
      } else {
        // Resposta com erro: exibir mensagem de erro ao usuário
        setError("Erro ao inserir árvore. Por favor, tente novamente.");
      }
    } catch (error) {
      console.log("Erro na requisição:", error); // Imprimir o erro capturado
      // Erro na requisição: exibir mensagem de erro ao usuário
      setError("Erro ao enviar requisição. Por favor, tente novamente mais tarde.");
    }
  }
  

   function onInputChange(event) {
    setNewArvore({
      ...newArvore,
      [event.target.id]: event.target.value,
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
                      <label htmlFor="altura">Altura:</label>
                      <input
                        className="form-control"
                        id="altura"
                        type="text"
                        placeholder=""
                        value={newArvore.altura || ""}
                        //required
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
                        value={newArvore.cap1 || ""}
                        //required
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
                        value={newArvore.cap2 || ""}
                        //required
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
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <label htmlFor="latitude">Latitude:</label>
                      <input
                        className="form-control"
                        id="latitude"
                        type="text"
                        placeholder="ex: -23.5505"
                        value={newArvore.latitude || ""}
                        //required
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
                        value={newArvore.longitude || ""}
                        //required
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
                        value={newArvore.justificativa || ""}
                        //required
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
