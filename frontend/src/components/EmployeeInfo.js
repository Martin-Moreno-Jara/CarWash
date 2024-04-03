import "../stylesheets/EmployeeInfo.css";
import { useState } from "react";
const EmployeeInfo = () => {
  const [seleccionado, setSeleccionado] = useState(false);
  const handleClick = () => {
    setSeleccionado(true);
  };
  return (
    <div
      onClick={handleClick}
      className={seleccionado ? "seleccionado" : "empleadoInfo-main"}
    >
      Info del empleado
    </div>
  );
};
export default EmployeeInfo;
