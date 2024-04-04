import { useEffect } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import { useEmployeeContext } from "../hooks/useEmployeeReducer";
import { useSelectEmployee } from "../hooks/useSelectEmployee";
import "../stylesheets/EmployeeList.css";
const apiURL = process.env.REACT_APP_DEVURL;
const EmployeeList = () => {
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`${apiURL}/api/empleadoCRUD`);
    };
    fetchEmployees();
  }, []);
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
          <input type="checkbox" name="empleados" id="emp1"></input>
          <label for="emp1" className={selected ? "details-label" : ""}>
            {<EmployeeInfo selected={selected} handleClick={handleClick} />}
          </label>
          <input type="checkbox" name="empleados" id="emp2"></input>
          <label for="emp2" className={selected ? "details-label" : ""}>
            {<EmployeeInfo selected={selected} handleClick={handleClick} />}
          </label>
        </div>
      </div>
      <div className="empleados-actions">
        <div className="action-btn">Ver</div>
        <div className="action-btn">Eliminar</div>
      </div>
    </>
  );
};
export default EmployeeList;
