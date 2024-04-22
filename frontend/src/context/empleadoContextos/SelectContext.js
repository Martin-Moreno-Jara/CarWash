//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { createContext, useReducer } from "react";
//**************************************************************

export const SelectContext = createContext();

export const selectReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_EMPLOYEE":
      return { selectedEmployee: action.payload };
    default:
      return state;
  }
};
export const SelectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(selectReducer, {
    selectedEmployee: null,
  });
  return (
    <SelectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SelectContext.Provider>
  );
};
