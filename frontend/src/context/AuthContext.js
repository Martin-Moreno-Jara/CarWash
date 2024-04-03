import { createContext, useReducer, useEffect } from "react";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return { usuario: action.payload };
    case "LOGOUT":
      return { usuario: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("usuario");
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);

  const [state, dispatch] = useReducer(authReducer, { state: null });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
