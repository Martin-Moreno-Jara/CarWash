import { useState } from "react";
import "../stylesheets/EmployeeForm.css";
const EmployeeFormAdd = ({ mostrar }) => {
  const [nombre, setNombre] = useState("");
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  return (
    <div className="main-container">
      <div
        className="closebtn"
        onClick={() => {
          return !mostrar;
        }}
      >
        <span class="material-symbols-outlined">close</span>
      </div>
      <h2>Ingrese la información del nuevo empleado</h2>
      <p>
        La contraseña asiganada debe tener mayúsculas, minúsculas, números y
        carácteres espciales
      </p>
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
export default EmployeeFormAdd;
