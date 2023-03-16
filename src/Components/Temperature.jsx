import React, { useState } from "react";

function Temperature({ initialValue = 0 }) {
  const [temperature, setTemperature] = useState(initialValue);

  const handleAdd = () => {
    setTemperature((prev) => prev + 1);
  };

  const handleMinus = () => {
    setTemperature((prev) => prev - 1);
  };
  const changeColor = (temperature) => {
    let style;
    if (temperature < 0) {
      style = { backgroundColor: "blue" };
    } else if (temperature <= 15) {
      style = { backgroundColor: "green" };
    } else if (temperature > 15 && temperature <= 30) {
      style = { backgroundColor: "yellow" };
    } else if (temperature > 30) {
      style = { backgroundColor: "red" };
    }
    return style;
  };
  return (
    <div className="temperature-content">
      <div style={changeColor(temperature)} className="temperature">
        {temperature}°C
      </div>
      <div className="temperature-action">
        <div className="controller" onClick={handleMinus}>
          -
        </div>
        <div className="controller" onClick={handleAdd}>
          +
        </div>
      </div>
    </div>
  );
}

export default Temperature;
