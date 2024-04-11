import { useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import "../stylesheets/EmployeeList.css";
import MoonLoader from "react-spinners/MoonLoader";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeList = () => {
  const { empleados, dispatch } = useEmployeeContext();
  const { show, showEdit } = useEmployeeCrudContext();
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiURL}/api/empleadoCRUD`);
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        throw Error("No se pudieron traer empleados");
      }
      if (response.ok) {
        setIsLoading(false);
        dispatch({ type: "SET_EMPLEADOS", payload: json });
      }
    };
    fetchEmployees();
  }, [dispatch]);

  return (
    <div
      className={
        show || showEdit ? "empleadoLista-main-noblur" : "empleadoLista-main"
      }
    >
      <table>
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Teléfono</th>
          <th>Cédula</th>
          <th>Acciones</th>
        </tr>

        {empleados &&
          empleados.map((empleado) => (
            <>
              {
                <EmployeeInfo
                  id={empleado._id}
                  nombre={empleado.nombre}
                  apellido={empleado.apellido}
                  usuario={empleado.usuario}
                  telefono={empleado.telefono}
                  cedula={empleado.cedula}
                />
              }
            </>
          ))}
      </table>
      {isLoading && (
        <div className="loading">
          <MoonLoader color="#1c143d" loading={isLoading} size={100} />
        </div>
      )}
    </div>
  );
};
export default EmployeeList;
