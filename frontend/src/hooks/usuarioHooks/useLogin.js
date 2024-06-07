//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
//CUSTOM HOOKS
import { useAuthContext } from "../useAuthContext";
//ENV VARIBLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  const checkFirstTimeUser = async (usuario) => {
    const response = await fetch(`${apiURL}/api/user/${usuario}`);
    const json = await response.json();
    return json.primeraVez;
  };

  const login = async (usuario, contrasena) => {
    setIsLoading(true);
    setError(null);

    const isFirstTimeUser = await checkFirstTimeUser(usuario);
    if (isFirstTimeUser && usuario !== "raulJm") {
      setIsLoading(false);
      setFirstTimeUser(true);
      return;
    }

    const response = await fetch(`${apiURL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena }),
    });
    const json = await response.json();
    

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("usuario", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { login, error, isLoading, firstTimeUser };
};
