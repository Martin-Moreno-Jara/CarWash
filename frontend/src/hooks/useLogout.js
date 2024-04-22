//************************** IMPORTED
//CUSTOM HOOKS
import { useAuthContext } from "../hooks/useAuthContext";
//ENV VARIBLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

//TODO
export const useLogout = () => {
  const { dispatch, usuario } = useAuthContext();
  const logout = async () => {
    await fetch(`${apiURL}/api/user/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario.usuario }),
    });

    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("usuario");
  };
  return { logout };
};
