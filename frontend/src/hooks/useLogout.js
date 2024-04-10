import { useAuthContext } from "../hooks/useAuthContext";
//TODO
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("usuario");
  };
  return { logout };
};
