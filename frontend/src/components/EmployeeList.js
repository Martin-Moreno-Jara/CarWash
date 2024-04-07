import { useEffect } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import "../stylesheets/EmployeeList.css";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeList = () => {
  const { empleados, dispatch } = useEmployeeContext();
  const { show, showEdit } = useEmployeeCrudContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`${apiURL}/api/empleadoCRUD`);
      const json = await response.json();

      if (!response.ok) {
        throw Error("No se pudieron traer empleados");
      }
      if (response.ok) {
        console.log(json);
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
        <caption>Tabla de empleados</caption>
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Telefono</th>
          <th>Cédula</th>
          <th>acciones</th>
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
    </div>
  );
};
export default EmployeeList;
