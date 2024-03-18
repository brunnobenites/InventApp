import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { getInventarios } from "../../services/InventariosService";

function NewInventario({ match }) {
    const [inventario, setInventario] = useState('');
  
    useEffect(() => {
      const { id_inventario } = match.params; // Acessando o parâmetro id_inventario
      getInventarios(id_inventario)
        .then((data) => {
          setInventario(data);
        })
        .catch((err) => {
          console.error("Erro ao buscar inventário:", err);
        });
    }, [match.params]);

    return (
        <React.Fragment>
            <Menu />
            {inventario ? (
                <div>
                    <h1>{inventario.name}</h1>
                    <p>ID: {inventario.id_inventario}</p>
                    <p>Criado em: {inventario.createdAt}</p>
                    <p>Atualizado em: {inventario.updatedAt}</p>
                    {/* Adicione mais informações conforme necessário */}
                </div>
            ) : (
                <p>Carregando inventário...</p>
            )}
        </React.Fragment>
    )
}

export default NewInventario;
