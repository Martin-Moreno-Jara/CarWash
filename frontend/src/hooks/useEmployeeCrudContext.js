//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { EmployeeCrudContext } from "../context/EmployeeCrudContext";
//**************************************************************

export const useEmployeeCrudContext = () => {
  const context = useContext(EmployeeCrudContext);
  if (!context) {
    throw Error("Contexto usado fuera de alcance");
  }
  return { ...context };
};
