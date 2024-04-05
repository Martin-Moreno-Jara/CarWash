import { useEffect } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSelectEmployee } from "../hooks/useSelectEmployee";
import "../stylesheets/EmployeeList.css";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeList = () => {
  const { empleados, dispatch } = useEmployeeContext();

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

  const { selected } = useEmployeeContext();
  const { selectEmployee } = useSelectEmployee();
  const handleClick = () => {
    selectEmployee();
  };

  return (
    <>
      <div className="empleadoLista-main">
        lista de empleados
        <div className="details-container">
          {empleados &&
            empleados.map((empleado) => (
              <>
                <input type="checkbox" name="empleados" id="emp2"></input>
                <label for="emp2" className={selected ? "details-label" : ""}>
                  {
                    <EmployeeInfo
                      nombre={empleado.nombre}
                      apellido={empleado.apellido}
                      usuario={empleado.usuario}
                      telefono={empleado.telefono}
                      cedula={empleado.cedula}
                    />
                  }
                </label>
              </>
            ))}
        </div>
      </div>
    </>
  );
};
export default EmployeeList;
