import React, { useState, useEffect } from "react";
import { getAllInventarios } from "../../services/InventariosService";

function SelectInventario({ id_inventario, onChange, selectLast }) {
  const [inventarios, setInventarios] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);

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
          let selected;
          if (id_inventario) {
            selected = inventariosData.find(
              (inventario) => inventario.id_inventario === id_inventario
            );
          } else if (selectLast) {
            selected = inventariosData[0]; // O primeiro item é o mais recente
          }
          setSelectedInventario(selected);
        }
      } catch (error) {
        console.error("Erro ao obter inventários:", error);
        setInventarios(["ERROR"]);
      }
    }

    fetchInventarios();
  }, [id_inventario, selectLast]);

  useEffect(() => {
    if (selectedInventario) {
      onChange({
        target: {
          id: "id_inventario",
          value: selectedInventario.id_inventario,
        },
      });
    }
  }, [selectedInventario]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = inventarios.find(
      (inventario) => String(inventario.id_inventario) === selectedId
    );

    if (selected) {
      setSelectedInventario(selected); // Update the selected inventory
    } else {
      setSelectedInventario(null); // Set selectedInventario to null if no inventory is selected
    }
  };

  return (
    <div className="form-group mb-4">
      <label htmlFor="id_inventario">ID Inventário:</label>
      <div className="input-group">
        <select
          id="id_inventario"
          className="form-select"
          onChange={handleSelectChange}
          value={selectedInventario ? selectedInventario.id_inventario : ""} // Use the id of the selected inventory as the value
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
}

export default SelectInventario;
