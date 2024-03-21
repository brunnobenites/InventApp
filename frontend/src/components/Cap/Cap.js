import React, { useState } from "react";

function FormCap() {
  const [campos, setCampos] = useState(["cap1 (cm)"]);

  const adicionarCampo = () => {
    setCampos([...campos, `cap${campos.length + 1}`]);
  };

  const removerCampo = () => {
    setCampos(campos.slice(0, -1));
  };

  return (
    <div>
      {campos.map((campo, index) => (
        <div key={index}>
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="form-group d-flex align-items-center">
                <label className="me-2">{campo}</label>
                <input type="text" name={campo} className="me-2" />
                <button
                  type="button"
                  className="btn btn-info dropdown-success"
                  onClick={adicionarCampo}
                >
                  <svg
                    className="icon icon-xs w-50 h-50"
                    data-slot="icon"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>
                </button>
                {campos.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-info dropdown-info"
                    onClick={removerCampo}
                  >
                    <svg
                      className="icon icon-xs w-50 h-50"
                      data-slot="icon"
                      fill="none"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 12h14"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormCap;
