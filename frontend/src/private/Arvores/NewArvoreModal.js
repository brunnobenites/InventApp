import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import SelectInventario from "../Inventarios/SelectInventario";
import { insertArvore, getAllArvores } from "../../services/ArvoresService";
import { getAllInventarios } from "../../services/InventariosService";
import FormWithLocation from "../../components/Coordinate/Coordinate";
import FormWithCamera from "../../components/Photos/Photos";
import FormCap from "../../components/Cap/Cap";

function NewArvoreModal({ id_inventario, updateArvoresList, setPage }) {
  const history = useHistory();
  const btnClose = useRef("");
  const [newArvore, setNewArvore] = useState({});
  const [photos, setPhotos] = useState([]);
  const [lastInventarioId, setLastInventarioId] = useState(null); // [1
  const [error, setError] = useState("");

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

  async function onFormSubmit(event) {
    event.preventDefault();

    if (!newArvore.id_inventario || isNaN(Number(newArvore.id_inventario))) {
      setError("ID do inventário não especificado ou inválido.");
      return;
    }

    try {
      const formData = new FormData();

      for (let key in newArvore) {
        if (newArvore[key] !== null && newArvore[key] !== undefined) {
          formData.append(key, newArvore[key]);
        }
      }
      formData.set("id_inventario", Number(newArvore.id_inventario));

      // Adicione as fotos ao FormData
      formData.append("foto1", newArvore.foto1);
      formData.append("foto2", newArvore.foto2);

      // Chame a função insertArvore passando o FormData com as fotos
      await insertArvore(formData);

      // Limpe os campos do formulário e os erros após inserção bem-sucedida
      setNewArvore({});
      setPhotos([]); // Limpe os campos de fotos
      setError("");

      // Atualize a lista de árvores e navegue para a página correta
      updateArvoresList();
      const { total } = await getAllArvores();
      const newPage = Math.ceil(total / 10);
      setPage(newPage);
      history.push(`/arvores?page=${newPage}`);
      // Feche a modal após a inserção bem-sucedida
      btnClose.current.click();
    } catch (error) {
      console.error("Erro na requisição POST:", error);
      setError("Erro ao inserir árvore.");
    }
  }

  function onInputChange(event) {
    const { id, value, type } = event.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;

    setNewArvore({
      ...newArvore,
      [id]: parsedValue,
    });
  }

  function handleInputChange(field, value) {
    setNewArvore({
      ...newArvore,
      [field]: value,
    });
  }

  function capInputChange(event) {
    const { id, value } = event.target;
    setNewArvore((prevState) => ({
      ...prevState,
      [id]: value === "" ? null : value,
    }));
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
                        onChange={onInputChange}
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
                        onChange={onInputChange}
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
                        onChange={onInputChange}
                      />
                    </div>
                  </div>

                  <FormCap
                    defaultFields={["cap1"]}
                    handleInputChange={capInputChange}
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
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <FormWithLocation
                  handleInputChange={capInputChange}
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
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </div>
                <FormWithCamera onChange={handleInputChange} />
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
