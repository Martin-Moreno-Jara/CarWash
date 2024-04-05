import "../stylesheets/CrudEmpleados.css";
import EmployeeFormAdd from "../components/EmployeeFormAdd";
import EmployeeList from "../components/EmployeeList";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import EmployeeFormEdit from "../components/EmployeeFormEdit";
import { useSelectContext } from "../hooks/useSelectContext";
const CrudEmpleados = () => {
  const { show, showEdit, dispatch } = useEmployeeCrudContext();
  const { selectedEmployee } = useSelectContext();
  return (
    <div className="crudEmpleados-main">
      <div className="empleado-options">
        <h2>Modulo de gestión de empleados</h2>
        <p>
          Podrá ver la lista de los empleados. También añadir nuevos empleados o
          editar la información ya existente sobre ellos.
        </p>
        <div className="options-btns">
          <div
            className="empleado-manage-btn"
            onClick={() => {
              dispatch({ type: "SHOW_CREATE_DIALOG", payload: !show });
            }}
          >
            Crear empleado
          </div>
          <button
            className={
              selectedEmployee ? "empleado-manage-btn" : "disabled-btn"
            }
            disabled={!selectedEmployee ? true : false}
            onClick={() => {
              dispatch({ type: "SHOW_EDIT_DIALOG", payload: !showEdit });
            }}
          >
            Editar empleado
          </button>
        </div>
      </div>
      <div className="div-list">
        {show && (
          <div className="div-background">
            <EmployeeFormAdd />
          </div>
        )}
        {showEdit && (
          <div className="div-background">
            <EmployeeFormEdit />
          </div>
        )}
        <div className="actual-list">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};
export default CrudEmpleados;
