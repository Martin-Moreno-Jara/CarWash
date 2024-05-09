//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { SelectContext } from "../../context/empleadoContextos/SelectContext";
//**************************************************************

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw Error("context used out of reach");
  }
  return { ...context };
};
