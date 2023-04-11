import React from "react";
import nada from "../../assets/nada.svg";

export default function NoEvents({ text }) {
  return (
    <div className="no-events-component">
      <div className="event-image-container">
        <object type="image/svg+xml" data={nada}>
          Error al cargar svg
        </object>
        <p>{text}</p>
      </div>
    </div>
  );
}
