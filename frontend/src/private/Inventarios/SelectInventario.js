import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllInventarios } from "../../services/InventariosService";

function SelectInventario({ id_inventario, onChange, selectLast }) {
  const history = useHistory();
  const [inventarios, setInventarios] = useState([]);
  const [nomeInventario, setNomeInventario] = useState("");

  useEffect(() => {
    async function fetchInventarios() {
      try {
        let inventariosData = await getAllInventarios();
        // Ordena os inventários por data de criação, do mais recente para o mais antigo
        inventariosData = inventariosData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setInventarios(inventariosData);
        if (inventariosData.length > 0) {
          let selectedInventario;
          if (id_inventario) {
            selectedInventario = inventariosData.find(
              (inventario) => inventario.id_inventario == id_inventario
            );
          } else if (selectLast) {
            selectedInventario = inventariosData[0]; // O primeiro item é o mais recente
          }
          if (selectedInventario) {
            setNomeInventario(selectedInventario.name);
            onChange({
              target: {
                id: "id_inventario",
                value: selectedInventario.id_inventario,
              },
            });
          }
        }
      } catch (error) {
        console.error("Erro ao obter inventários:", error);
        setInventarios(["ERROR"]);
      }
    }

    fetchInventarios();
  }, [id_inventario]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedInventario = inventarios.find(
      (inventario) => inventario.id_inventario == selectedId
    );

    if (selectedInventario) {
      setNomeInventario(selectedInventario.name); // Define o nome do inventário selecionado
      if (typeof onChange === "function") {
        onChange({
          target: {
            id: "id_inventario",
            value: selectedInventario.id_inventario,
          },
        });
      }
    }
  };

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
              selected={inventario.id_inventario == id_inventario}
            >
              {inventario.id_inventario} - {inventario.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectInventario;
