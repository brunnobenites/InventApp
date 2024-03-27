import React, { useState, useEffect, useMemo } from "react";

function FormCap({
  defaultFields = [],
  handleInputChange,
  initialValues = {},
}) {
  const cap = useMemo(
    () => ({
      cap1: initialValues.cap1 || "",
      cap2: initialValues.cap2 || "",
      cap3: initialValues.cap3 || "",
      cap4: initialValues.cap4 || "",
      cap5: initialValues.cap5 || "",
      cap6: initialValues.cap6 || "",
      cap7: initialValues.cap7 || "",
      cap8: initialValues.cap8 || "",
      cap9: initialValues.cap9 || "",
      cap10: initialValues.cap10 || "",
    }),
    [initialValues]
  );

  const [capCount, setCapCount] = useState(1);

  useEffect(() => {
    const capValues = Object.values(cap).filter((value) => value !== "");
    setCapCount(capValues.length > 0 ? capValues.length : 1);
  }, [cap]);

  function handleCapInputChange(event) {
    const { id, value } = event.target;
    handleInputChange(event);
  }

  function handleAddCap() {
    setCapCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
  }

  function handleRemoveCap() {
    setCapCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  }

  return (
    <div>
      <div className="row">
        {[...Array(capCount)].map((_, index) => (
          <div key={index} className="col-md-3 mb-2">
            <div className="form-group">
              <label htmlFor={`cap${index + 1}`}>Cap{index + 1} (cm):</label>
              <input
                className="form-control"
                id={`cap${index + 1}`}
                type="number"
                placeholder=""
                value={cap[`cap${index + 1}`] || ""}
                onChange={handleCapInputChange}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-3 mb-2">
          {capCount < 10 && (
            <button className="btn btn-info  mr-2" onClick={handleAddCap}>
              +
            </button>
          )}
          {capCount > 1 && (
            <button className="btn btn-info" onClick={handleRemoveCap}>
              -
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormCap;
