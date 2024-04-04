import "../stylesheets/EmployeeInfo.css";
import { useState } from "react";
import { useSelectEmployee } from "../hooks/useSelectEmployee";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
const EmployeeInfo = ({ nombre, apellido, usuario, telefono }) => {
  return (
    <div className={"empleadoInfo-main"}>
      <span>Nombre: {`${nombre} ${apellido}`}</span>
      <span>Usuario: {usuario}</span>
      <span> telefono: {telefono}</span>
    </div>
  );
};
export default EmployeeInfo;
