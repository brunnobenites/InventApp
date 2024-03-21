import React, { useState, useRef } from "react";

function FormWithCamera() {
  const [newArvore, setNewArvore] = useState({
    foto1: "",
    foto2: "",
  });

  const fileInput1 = useRef();
  const fileInput2 = useRef();

  const handleCapture = (field) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewArvore({
        ...newArvore,
        [field]: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <div className="row">
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <div>
              <label htmlFor="foto1">Foto 1:</label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-info dropdown-toggle"
                onClick={() => fileInput1.current.click()}
              >
                Tirar Foto1
              </button>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleCapture("foto1")}
                style={{ display: "none" }}
                ref={fileInput1}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <div>
              <label htmlFor="foto2">Foto 2:</label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-info dropdown-toggle"
                onClick={() => fileInput2.current.click()}
              >
                Tirar Foto2
              </button>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleCapture("foto2")}
                style={{ display: "none" }}
                ref={fileInput2}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormWithCamera;
