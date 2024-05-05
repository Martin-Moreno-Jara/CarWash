//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { ServiceContext } from "../../context/servicioContext/ServiceContext";
//**************************************************************

export const useServiceContext = () => {
  const servicioContext = useContext(ServiceContext);
  if (!servicioContext) {
    throw Error("employeeContext used out of reach");
  }
  return servicioContext;
};
