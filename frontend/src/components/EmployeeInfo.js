import "../stylesheets/EmployeeInfo.css";
import { useState } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
const apiURL = process.env.REACT_APP_DEVURL;
const EmployeeInfo = ({
  id,
  nombre,
  apellido,
  usuario,
  telefono,
  cedula,
  isOn,
}) => {
  const { dispatch } = useEmployeeContext();

  const handleDelete = async () => {
    const response = await fetch(`${apiURL}/api/empleadoCRUD/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    dispatch({ type: "DELETE_EMPLEADO", payload: json });
  };
  return (
    <>
      <tr>
        <td data-cell="nombre">{`${nombre} ${apellido}`}</td>
        <td data-cell="usuario">{usuario}</td>
        <td data-cell="telefono">{telefono}</td>
        <td data-cell="cedula">{cedula}</td>
        <td data-cell="acciones" className="row-actions">
          <div className="action-div showmore">
            <span className="material-symbols-outlined">more_horiz</span>
          </div>

          <div className="action-div edit">
            <span
              className="material-symbols-outlined"
              onClick={() => {
                console.log("editar");
              }}
            >
              edit
            </span>
          </div>

          <div className="action-div delete">
            <span className="material-symbols-outlined">delete</span>
          </div>
        </td>
      </tr>
      {/* 
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
          <div className="empleado-btn delete" onClick={handleDelete}>
            <span className="material-symbols-outlined">delete</span>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default EmployeeInfo;
