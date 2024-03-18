import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { getAllInventarios } from "../../services/InventariosService";

function SelectInventario(props) {
  const history = useHistory();
  const [inventarios, setInventarios] = useState([]);
  const [nomeInventario, setNomeInventario] = useState("");

  useEffect(() => {
    async function fetchInventarios() {
      try {
        const inventariosData = await getAllInventarios();
        setInventarios(inventariosData);
        if (inventariosData.length > 0) {
          setNomeInventario(inventariosData[0].name);
          props.onChange({
            target: {
              id: "id_inventario",
              value: inventariosData[0].id_inventario,
            },
          });
        }
      } catch (error) {
        console.error("Erro ao obter inventários:", error);
        setInventarios(["ERROR"]);
      }
    }

    fetchInventarios();
  }, [props.onChange]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedInventario = inventarios.find(
      (inventario) => inventario.id_inventario == selectedId
    );
    if (selectedInventario) {
      setNomeInventario(selectedInventario.name); // Define o nome do inventário selecionado
      props.onChange({
        target: {
          id: "id_inventario",
          value: selectedInventario.id_inventario,
        },
      });
    }
  };

  const selectInventario = useMemo(() => {
    return (
      <div className="form-group mb-4">
        <label htmlFor="id_inventario">ID Inventário:</label>
        <div className="input-group">
          <button
            type="button"
            className="btn btn-secondary d-inline-flex align-items-center"
          ></button>
          <select
            id="id_inventario"
            className="form-select"
            onChange={handleSelectChange}
          >
            {inventarios.map((inventario) => (
              <option
                key={inventario.id_inventario}
                value={inventario.id_inventario}
              >
                {inventario.id_inventario} - {inventario.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }, [history, inventarios, nomeInventario, props.onChange]);

  return selectInventario;
}

export default SelectInventario;
