import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ConfirmarCuenta() {
  const { idUser } = useParams();
  const [mensaje, setMensaje] = useState("Confirmando cuenta...");

  useEffect(() => {
    axios
      .post(`http://localhost:8080/users/checkMail`, { idUser: idUser })
      .then((response) => {
        setMensaje("Cuenta confirmada exitosamente.");
      })
      .catch((error) => {
        setMensaje("Ocurrió un error al confirmar la cuenta.");
      });
  }, [idUser]);

  return (
    <div>
      <h1>{mensaje}</h1>
    </div>
  );
}

export default ConfirmarCuenta;
