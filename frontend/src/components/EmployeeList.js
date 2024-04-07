import { useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSelectContext } from "../hooks/useSelectContext";
import "../stylesheets/EmployeeList.css";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeList = () => {
  const { empleados, dispatch } = useEmployeeContext();
  const { show } = useEmployeeCrudContext();
  const { dispatch: dispatchIsSelected } = useSelectContext();

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckbox = (e) => {
    if (selectedCheckbox === e.target.id) {
      setSelectedCheckbox(null);
      dispatchIsSelected({ type: "SELECT_EMPLOYEE", payload: null });
      return;
    }
    setSelectedCheckbox(e.target.id);
    dispatchIsSelected({ type: "SELECT_EMPLOYEE", payload: e.target.id });
  };

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
    <div className={show ? "empleadoLista-main-noblur" : "empleadoLista-main"}>
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
              {/* <input
                type="checkbox"
                name="empleados"
                id={empleado._id}
                checked={empleado._id === selectedCheckbox ? true : false}
                onChange={handleCheckbox}
              ></input>
              <label
                htmlFor={empleado._id}
                className={selected ? "details-label" : ""}
              > */}
              {
                <EmployeeInfo
                  id={empleado._id}
                  nombre={empleado.nombre}
                  apellido={empleado.apellido}
                  usuario={empleado.usuario}
                  telefono={empleado.telefono}
                  cedula={empleado.cedula}
                  isOn={empleado._id === selectedCheckbox ? true : false}
                />
              }
              {/* </label> */}
            </>
          ))}
      </table>
    </div>
  );
};
export default EmployeeList;
