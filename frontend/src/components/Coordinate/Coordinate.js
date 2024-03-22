import React, { useState } from "react";

function FormWithLocation({ handleInputChange, latitude, longitude }) {
  const [newArvore, setNewArvore] = useState({
    accuracy: "",
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const getLocation = () => {
    setButtonClicked(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleInputChange({
            target: {
              id: "latitude",
              value: position.coords.latitude,
            },
          });
          handleInputChange({
            target: {
              id: "longitude",
              value: position.coords.longitude,
            },
          });
          setNewArvore((prevArvore) => ({
            ...prevArvore,
            accuracy: position.coords.accuracy,
          }));
        },
        () => {
          alert("Não foi possível obter a localização. Tente novamente.");
        }
      );
    }
  };

  const onInputChange = (event) => {
    handleInputChange(event);
  };

  return (
    <form>
      <div className="row">
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              className="form-control"
              id="latitude"
              type="number"
              placeholder=""
              value={latitude || ""}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
              className="form-control"
              id="longitude"
              type="number"
              placeholder=""
              value={longitude || ""}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <button
            type="button"
            className="btn btn-info dropdown-toggle mb-2 mt-1"
            onClick={getLocation}
          >
            <svg
              className="icon icon-xs me-2"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              ></path>
            </svg>
            Obter Coordenadas
          </button>
          {buttonClicked && (
            <span style={{ color: "black", fontSize: "14px" }}>
              Precisão:{" "}
              {newArvore.accuracy ? newArvore.accuracy.toFixed(2) : ""} m
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

export default FormWithLocation;
