import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * props:
 * - count
 * - max
 * - size
 */
function Pagination(props) {
  const PAGE_SIZE = props.size || 10;
  const MAX_PAGES = props.max || 10;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  function getPageClass(page) {
    // Pega o valor da página na URL
    const queryPage = query.get("page");

    // Verifica se a página atual (props.currentPage) é igual à página que está sendo renderizada
    // Se não houver uma página especificada na URL (queryPage é nulo), considera a primeira página como a página ativa
    const isActive = props.currentPage == page || (!queryPage && page == 1);

    // Se isActive for verdadeiro, retorna "page-item active", caso contrário, retorna "page-item"
    return isActive ? "page-item active" : "page-item";
  }

  function getPageLink(page) {
    return `${window.location.pathname}?page=${page}`;
  }

  let pagesQty = Math.ceil(props.count / PAGE_SIZE);
  pagesQty = pagesQty > MAX_PAGES ? MAX_PAGES : pagesQty;
  const pages = [];
  for (let i = 1; i <= pagesQty; i++) pages.push(i);

  function getBottom() {
    if (props.count > PAGE_SIZE * MAX_PAGES)
      return (
        <div className="fw-normal small mt-4 mt-lg-0">
          <b>{props.count}</b> resultados. Primeira <b>{MAX_PAGES}</b> páginas.
        </div>
      );
    else if (props.count > 0)
      return (
        <div className="fw-normal small mt-4 mt-lg-0">
          <b>{props.count}</b> resultados.
        </div>
      );
    else
      return (
        <div className="fw-normal small mt-4 mt-lg-0">
          <b>Nenhum resultado encontrado.</b> Crie o primeiro.
        </div>
      );
  }

  return (
    <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          {pages.map((p) => (
            <li key={p} className={getPageClass(p)}>
              <Link className="page-link" to={getPageLink(p)}>
                {p}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {getBottom()}
    </div>
  );
}

export default Pagination;
