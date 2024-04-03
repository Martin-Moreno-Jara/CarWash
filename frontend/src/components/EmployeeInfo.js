import "../stylesheets/EmployeeInfo.css";
import { useState } from "react";
import { useSelectEmployee } from "../hooks/useSelectEmployee";
import { useEmployeeContext } from "../hooks/useEmployeeReducer";
const EmployeeInfo = ({ selected, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={selected ? "seleccionado" : "empleadoInfo-main"}
    >
      Info del empleado
    </div>
  );
};
export default EmployeeInfo;
