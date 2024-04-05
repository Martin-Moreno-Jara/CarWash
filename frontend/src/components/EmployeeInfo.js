import "../stylesheets/EmployeeInfo.css";
import { useState } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
const EmployeeInfo = ({
  id,
  nombre,
  apellido,
  usuario,
  telefono,
  cedula,
  isOn,
}) => {
  return (
    <div className={!isOn ? "empleadoInfo-main" : "isOn"}>
      <div className="icons-data">
        <span className="material-symbols-outlined icons">Person</span>
        <div className="personal-info">
          <p>{`${nombre} ${apellido}`}</p>
          <p>{usuario}</p>
        </div>
      </div>
      <div className="icons-data">
        <span className="material-symbols-outlined icons">call</span>
        <p>{telefono}</p>
      </div>
      <div className="icons-data">
        <span className="material-symbols-outlined icons">id_card</span>
        <p>{cedula}</p>
      </div>

      <div className="empleadoInfo-btn">
        <div className="empleado-btn show-more">
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
        <div className="empleado-btn delete">
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
    </div>
  );
};
export default EmployeeInfo;
