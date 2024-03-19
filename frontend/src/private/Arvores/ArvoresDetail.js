import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArvore } from "../../services/ArvoresService";

function ArvoresDetail() {
  const { id_arvore } = useParams();
  const [arvore, setArvore] = useState(null);

  useEffect(() => {
    async function fetchArvore() {
      try {
        const arvoreData = await getArvore(id_arvore);
        setArvore(arvoreData);
      } catch (error) {
        console.error("Erro ao buscar detalhes da árvore:", error);
      }
    }

    fetchArvore();
  }, [id_arvore]);

  // ... use arvore para renderizar os detalhes ...

  return (
    console.log('teste')
  );
}

export default ArvoresDetail;
