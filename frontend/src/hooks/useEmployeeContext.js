import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw Error("employeeContext used out of reach");
  }
  return context;
};
