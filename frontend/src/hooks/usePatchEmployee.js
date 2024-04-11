import { useState } from "react";
import { useEmployeeContext } from "./useEmployeeContext";
import { useEmployeeCrudContext } from "./useEmployeeCrudContext";
import { useSelectContext } from "./useSelectContext";
const apiURL = process.env.REACT_APP_DEPLOYURL;

export const usePatchEmployee = () => {
  const { selectedEmployee } = useSelectContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { showEdit, dispatch } = useEmployeeCrudContext();
  const { dispatch: dispatchUpdate } = useEmployeeContext();

  const patchEmployee = async (
    nombre,
    apellido,
    telefono,
    cedula,
    direccion,
    usuario,
    contrasena,
    passConfirm
  ) => {
    setIsLoading(true);
    const send = {
      nombre,
      apellido,
      telefono,
      cedula,
      direccion,
      usuario,
      contrasena,
    };

    const fetchUpdate = await fetch(
      `${apiURL}/api/empleadoCRUD/${selectedEmployee}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(send),
      }
    );
    const update = await fetchUpdate.json();
    if (!fetchUpdate.ok) {
      setIsLoading(false);
      setError(update.error);
    }
    if (fetchUpdate.ok) {
      setIsLoading(false);
      setError(null);
      dispatchUpdate({ type: "PATCH_EMPLEADO", payload: update });
      dispatch({ type: "SHOW_EDIT_DIALOG", payload: !showEdit });
    }
  };
  return { patchEmployee, error, setError, isLoading };
};
