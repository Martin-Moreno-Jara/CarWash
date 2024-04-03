import { useState } from "react";
import "../stylesheets/EmployeeForm.css";
const EmployeeForm = () => {
  const [nombre, setNombre] = useState("");
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  return (
    <div className="main-container">
      <h2>Ingrese la información del empleado</h2>
      <form>
        <div className="form-fields">
          <div>
            <label>nombre</label>
            <input type="text" onChange={handleNombre} />
            <label>apellido</label>
            <input type="text" />
            <label>cedula</label>
            <input type="number" />
            <label>dirección</label>
            <input type="text" />
          </div>
          <div>
            <label>telefono</label>
            <input type="number" />
            <label>nombre de usuario</label>
            <input type="text" />
            <label>contraseña</label>
            <input type="password" />
          </div>
        </div>
        <button className="submit-btn" onClick={console.log(nombre)}>
          Crear empleado
        </button>
      </form>
    </div>
  );
};
export default EmployeeForm;
