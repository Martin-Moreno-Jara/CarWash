import { useState } from "react";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import "../stylesheets/EmployeeForm.css";

const EmployeeFormEdit = () => {
  const { showEdit, dispatch } = useEmployeeCrudContext();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setdireccion] = useState("");
  const [usuario, setusuario] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleApellido = (e) => {
    setApellido(e.target.value);
  };
  const handleTelefono = (e) => {
    setTelefono(e.target.value);
  };
  const handleCedula = (e) => {
    setCedula(e.target.value);
  };
  const handleDireccion = (e) => {
    setdireccion(e.target.value);
  };
  const handleusuario = (e) => {
    setusuario(e.target.value);
  };
  const handlecontrasena = (e) => {
    setcontrasena(e.target.value);
  };
  const handlePassConfirm = (e) => {
    setPassConfirm(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombre &&
      apellido &&
      telefono &&
      cedula &&
      direccion &&
      usuario &&
      contrasena &&
      passConfirm
    ) {
      if (passConfirm !== contrasena) {
        // setError("Las contraseñas no coinciden");
        return;
      }
      //   await signupEmployee(
      //     nombre,
      //     apellido,
      //     telefono,
      //     cedula,
      //     direccion,
      //     usuario,
      //     contrasena
      //   );
    } else {
      //   setError("Todos los campos deben ser llenados");
    }
  };
  return (
    <div className="main-container">
      <div
        className="closebtn"
        onClick={() => {
          dispatch({ type: "SHOW_EDIT_DIALOG", payload: !showEdit });
        }}
      >
        <span class="material-symbols-outlined">close</span>
      </div>
      <h1>Edición de empleado</h1>
      <h2>Ingrese la nueva información del empleado</h2>
      <p>
        La contraseña asiganada debe tener mayúsculas, minúsculas, números y
        carácteres espciales
      </p>
      <form className="form-div" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div>
            <label>nombre</label>
            <input type="text" onChange={handleNombre} />
            <label>telefono</label>
            <input type="number" onChange={handleTelefono} />
            <label>dirección</label>
            <input type="text" onChange={handleDireccion} />
            <label>contraseña</label>
            <input type="password" onChange={handlecontrasena} />
          </div>
          <div>
            <label>apellido</label>
            <input type="text" onChange={handleApellido} />
            <label>cedula</label>
            <input type="number" onChange={handleCedula} />
            <label>nombre de usuario</label>
            <input type="text" onChange={handleusuario} />
            <label>Confirmar contraseña</label>
            <input type="password" onChange={handlePassConfirm} />
          </div>
        </div>
        <button className="submit-btn">Crear empleado</button>
      </form>
    </div>
  );
};
export default EmployeeFormEdit;
