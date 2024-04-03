import { useAuthContext } from "../hooks/useAuthContext";
const apiURL = process.env.REACT_APP_DEVURL;

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (usuario, contrasena) => {
    console.log(usuario, contrasena);
    const response = await fetch(`${apiURL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
    }
    if (response.ok) {
      console.log("inicio de sesion exitoso");
      localStorage.setItem("usuario", JSON.stringify(json));
      console.log(json);
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { login };
};
