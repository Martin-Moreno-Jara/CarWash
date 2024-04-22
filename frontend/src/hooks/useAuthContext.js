//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useContext } from "react";
//CONTEXT
import { AuthContext } from "../context/AuthContext";
//**************************************************************

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("AuthContext used out of reach");
  }
  return context;
};
