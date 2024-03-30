import EmployeeForm from "../components/EmployeeForm";
import "../stylesheets/FormTest.css";
const FormTest = () => {
  return (
    <div className="main-container">
      <h1>PAGINA DEL CRUD DE EMPLEADOS</h1>
      <EmployeeForm></EmployeeForm>
    </div>
  );
};

export default FormTest;
