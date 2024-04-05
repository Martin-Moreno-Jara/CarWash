import { createContext, useEffect, useReducer } from "react";
export const EmployeeCrudContext = createContext();
export const employeeCrudReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_CREATE_DIALOG":
      return { show: action.payload };
    default:
      return { state };
  }
};
export const EmployeeCrudContextProvider = ({ children }) => {
  useEffect(() => {
    dispatch({ type: "SHOW_CREATE_DIALOG", payload: false });
  }, []);
  const [state, dispatch] = useReducer(employeeCrudReducer, { state: null });
  return (
    <EmployeeCrudContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeCrudContext.Provider>
  );
};
