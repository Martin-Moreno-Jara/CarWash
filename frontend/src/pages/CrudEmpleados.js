//************************** IMPORTED
//CUSTOM HOOKS
import { useEmployeeCrudContext } from "../hooks/empleadoHooks/useEmployeeCrudContext";
//COMPONENTS
import EmployeeFormAdd from "../components/empleadoCrud/EmployeeFormAdd";
import EmployeeList from "../components/empleadoCrud/EmployeeList";
import EmployeeFormEdit from "../components/empleadoCrud/EmployeeFormEdit";
//STYLESHEET
import "../stylesheets/CrudEmpleados.css";
//**************************************************************

const CrudEmpleados = () => {
  const { show, showEdit, dispatch } = useEmployeeCrudContext();
  return (
    <div className="crudEmpleados-main">
      <div className="empleado-options">
        <div className="description">
          <h2>Modulo de gestión de empleados</h2>
          <p>
            Podrá ver la lista de los empleados. También añadir nuevos empleados
            o editar la información ya existente sobre ellos.
          </p>
        </div>

        <div className="options-btns">
          <div
            className="empleado-manage-btn"
            onClick={() => {
              dispatch({ type: "SHOW_CREATE_DIALOG", payload: !show });
            }}
          >
            Crear Empleado
          </div>
        </div>
      </div>
      <div className={show || showEdit ? "div-list-dark" : "div-list"}>
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
        <div className={show || showEdit ? "actual-list-none" : "actual-list"}>
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};
export default CrudEmpleados;
