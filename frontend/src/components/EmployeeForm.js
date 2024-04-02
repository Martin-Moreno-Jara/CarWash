import { useState } from "react";
import "../stylesheets/EmployeeForm.css";
const EmployeeForm = () => {
  const [nombre, setNombre] = useState("");
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  return (
    <div className="main-container">
      <h2>Por favor, ingrese la información del empleado</h2>
      <form>
        <div className="form-fields">
          <label>nombre</label>
          <input type="text" onChange={handleNombre} />
          <label>apellido</label>
          <input type="text" />
          <label>cedula</label>
          <input type="number" />
          <label>dirección</label>
          <input type="text" />
          <label>telefono</label>
          <input type="number" />
          <label>nombre de usuario</label>
          <input type="text" />
          <label>contraseña</label>
          <input type="password" />
        </div>
        <button className="submit-btn" onClick={console.log(nombre)}>
          Crear empleado
        </button>
      </form>
    </div>
  );
};
export default EmployeeForm;
