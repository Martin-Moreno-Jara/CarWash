import EmployeeInfo from "../components/EmployeeInfo";
import "../stylesheets/EmployeeList.css";
const EmployeeList = () => {
  return (
    <>
      <div className="empleadoLista-main">
        lista de empleados
        <div className="details-container">
          <input type="radio" name="empleados" id="emp1"></input>
          <label for="emp1">{<EmployeeInfo />}</label>
          <input type="radio" name="empleados" id="emp2"></input>
          <label for="emp2">{<EmployeeInfo />}</label>
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
