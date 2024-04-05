import { createContext, useEffect, useReducer } from "react";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLEADOS":
      return { empleados: action.payload };
    case "ADD_EMPLEADO":
      return { empleados: [action.payload, ...state.empleados] };
    default:
      return { state };
  }
};

export const EmployeeContextProvider = ({ children }) => {
  useEffect(() => {}, []);

  const [state, dispatch] = useReducer(employeeReducer, { state: null });
  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
