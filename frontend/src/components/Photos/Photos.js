import React, { useRef, useState } from "react";

function FormWithCamera({ onChange, onChangeUpdate }) {
  const inputRef1 = useRef(null); // useRef separado para foto1
  const inputRef2 = useRef(null); // useRef separado para foto2
  const [buttonClicked1, setButtonClicked1] = useState(false);
  const [buttonClicked2, setButtonClicked2] = useState(false);
  const [fileAttached1, setFileAttached1] = useState(false);
  const [fileAttached2, setFileAttached2] = useState(false);

  const handleCapture = (field) => (event) => {
    const file = event.target.files.length > 0 ? event.target.files[0] : null;
    console.log(`File selected for ${field}:`, file); // Log the file data
    onChange(field, file); // Passa o nome do campo e o arquivo para onChange

    // Define fileAttached1 como true se a foto1 for anexada
    if (field === "foto1") {
      setFileAttached1(true);
    }

    // Define fileAttached2 como true se a foto2 for anexada
    if (field === "foto2") {
      setFileAttached2(true);
    }
  };

  const handleClick = (inputRef, setButtonClicked) => () => {
    inputRef.current.click(); // Simula o clique no input file ao clicar no botão
    setButtonClicked(true); // Define buttonClicked como true ao clicar no botão
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-2">
        <div className="form-group">
          <div>
            <label htmlFor="foto1">Foto 1:</label>
          </div>
          <div>
            <input
              ref={inputRef1}
              type="file"
              accept="image/*"
              capture="user"
              style={{ display: "none" }} // Esconde o input file
              onChange={handleCapture("foto1")} // Passa "foto1" para handleCapture
            />
            <button
              className="btn btn-info dropdown-toggle mb-2 mt-1"
              type="button"
              onClick={handleClick(inputRef1, setButtonClicked1)}
            >
              Tirar foto
            </button>
          </div>
          {buttonClicked1 && fileAttached1 && (
            <span style={{ color: "black", fontSize: "14px" }}>
              Foto 1 anexada com sucesso
            </span>
          )}
        </div>
      </div>
      <div className="col-md-6 mb-2">
        <div className="form-group">
          <div>
            <label htmlFor="foto2">Foto 2:</label>
          </div>
          <div>
            <input
              ref={inputRef2}
              type="file"
              accept="image/*"
              capture="user"
              style={{ display: "none" }} // Esconde o input file
              onChange={handleCapture("foto2")} // Passa "foto2" para handleCapture
            />
            <button
              className="btn btn-info dropdown-toggle mb-2 mt-1"
              type="button"
              onClick={handleClick(inputRef2, setButtonClicked2)}
            >
              Tirar foto
            </button>
          </div>
          {buttonClicked2 && fileAttached2 && (
            <span style={{ color: "black", fontSize: "14px" }}>
              Foto 2 anexada com sucesso
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormWithCamera;
