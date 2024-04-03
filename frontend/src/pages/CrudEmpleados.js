import "../stylesheets/CrudEmpleados.css";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
const CrudEmpleados = () => {
  return (
    <div className="crudEmpleados-main">
      <div>
        lista
        <EmployeeList />
      </div>
      <div>
        formulario
        <EmployeeForm />
      </div>
    </div>
  );
};
export default CrudEmpleados;
