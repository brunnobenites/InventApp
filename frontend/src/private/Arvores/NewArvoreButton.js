import React from "react";

function NewArvoreButton() {
  return (
    <button
      id="btnNewArvore"
      className="btn btn-primary dropdown-toggle"
      data-bs-toggle="modal"
      data-bs-target="#modalNewArvore"
    >
      <svg
        class="icon icon-xs me-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
      Nova Árvore
    </button>
  );
}

export default NewArvoreButton;
