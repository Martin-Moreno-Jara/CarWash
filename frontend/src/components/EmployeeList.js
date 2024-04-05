import { useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSelectContext } from "../hooks/useSelectContext";
import "../stylesheets/EmployeeList.css";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeList = () => {
  const { empleados, dispatch } = useEmployeeContext();
  const { selectedEmployee, dispatch: dispatchIsSelected } = useSelectContext();

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

  const { selected } = useEmployeeContext();

  return (
    <div className="empleadoLista-main">
      lista de empleados
      <div className="details-container">
        {empleados &&
          empleados.map((empleado) => (
            <div>
              <input
                type="checkbox"
                name="empleados"
                id={empleado._id}
                checked={empleado._id === selectedCheckbox ? true : false}
                onChange={handleCheckbox}
              ></input>
              <label
                htmlFor={empleado._id}
                className={selected ? "details-label" : ""}
              >
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
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};
export default EmployeeList;
