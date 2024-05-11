//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
//CUSTOM HOOKS
import { useAuthContext } from "../useAuthContext";
import { useEmployeeContext } from "../empleadoHooks/useEmployeeContext";
import { useEmployeeCrudContext } from "../empleadoHooks/useEmployeeCrudContext";
//ENV VARIBLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { usuario: loggedUser } = useAuthContext();

  const { dispatch: dispatchCloseWindow, show } = useEmployeeCrudContext();
  const { dispatch } = useEmployeeContext();

  const signupEmployee = async (
    nombre,
    apellido,
    telefono,
    cedula,
    direccion,
    usuario,
    contrasena,
    passConfirm
  ) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch(`${apiURL}/api/empleadoCRUD/signupEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
      body: JSON.stringify({
        nombre,
        apellido,
        telefono,
        cedula,
        direccion,
        usuario,
        contrasena,
        passConfirm,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
      setError(null);
      dispatch({ type: "ADD_EMPLEADO", payload: json });
      dispatchCloseWindow({ type: "SHOW_CREATE_DIALOG", payload: !show });
    }
  };
  return { signupEmployee, error, setError, isLoading };
};
