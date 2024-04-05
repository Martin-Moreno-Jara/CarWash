import "../stylesheets/CrudEmpleados.css";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
const CrudEmpleados = () => {
  return (
    <div className="crudEmpleados-main">
      <div className="empleado-options">
        <h2>Modulo de gestión de empleados</h2>
        <p>
          Podrá ver la lista de los empleados. También añadir nuevos empleados o
          editar la información ya existente sobre ellos.
        </p>
        <div className="options-btns">
          <div className="empleado-manage-btn">Crear empleado</div>
          <div className="empleado-manage-btn">Editar empleado</div>
        </div>
      </div>
      <div className="div-list">
        <div className="actual-list">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};
export default CrudEmpleados;
