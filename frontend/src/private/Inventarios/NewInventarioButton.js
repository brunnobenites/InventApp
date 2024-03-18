import React from "react";

function NewInventarioButton() {
  return (
    <button
      id="btnNewInventario"
      className="btn btn-primary dropdown-toggle"
      data-bs-toggle="modal"
      data-bs-target="#modalNewInventario"
    >
      <svg
        class="icon icon-xs me-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
      Novo Inventário
    </button>
  );
}

export default NewInventarioButton;
