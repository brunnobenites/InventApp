import React, { useState } from "react";

function FormWithLocation() {
  const [newArvore, setNewArvore] = useState({ latitude: "", longitude: "" });

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewArvore({
            ...newArvore,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    }
  };

  const onInputChange = (event) => {
    setNewArvore({
      ...newArvore,
      [event.target.id]: event.target.value,
    });
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
              value={newArvore.latitude || ""}
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
              value={newArvore.longitude || ""}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <button
            type="button"
            className="btn btn-info dropdown-toggle"
            onClick={getLocation}
          >
            <svg
              className="icon icon-xs me-2"
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              ></path>
            </svg>
            Obter Coordenadas
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormWithLocation;
