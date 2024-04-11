import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
const apiURL = process.env.REACT_APP_DEPLOYURL;

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (usuario, contrasena) => {
    setIsLoading(true);
    setError(null);
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
      console.log("inicio de sesion exitoso");
      localStorage.setItem("usuario", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { login, error, isLoading };
};
