import { createContext, useEffect, useReducer } from "react";
export const EmployeeCrudContext = createContext();

export const employeeCrudReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_CREATE_DIALOG":
      return { show: action.payload };
    case "SHOW_EDIT_DIALOG":
      return { showEdit: action.payload };
    case "SHOW_MORE_DIALOG":
      return { showMore: action.payload };
    default:
      return state;
  }
};
export const EmployeeCrudContextProvider = ({ children }) => {
  useEffect(() => {
    dispatch({ type: "SHOW_CREATE_DIALOG", payload: false });
    dispatch({ type: "SHOW_EDIT_DIALOG", payload: false });
    dispatch({ type: "SHOW_MORE_DIALOG", payload: false });
  }, []);
  const [state, dispatch] = useReducer(employeeCrudReducer, {
    state: {
      show: null,
      showEdit: null,
      showMore: null,
    },
  });
  return (
    <EmployeeCrudContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeCrudContext.Provider>
  );
};
