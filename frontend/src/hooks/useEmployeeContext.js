//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { EmployeeContext } from "../context/EmployeeContext";
//**************************************************************

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw Error("employeeContext used out of reach");
  }
  return context;
};
