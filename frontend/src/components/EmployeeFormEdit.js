import { useEffect, useState } from "react";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import { useSelectContext } from "../hooks/useSelectContext";
import "../stylesheets/EmployeeForm.css";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeFormEdit = () => {
  const { showEdit, dispatch } = useEmployeeCrudContext();
  const { selectedEmployee } = useSelectContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

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

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const response = await fetch(
        `${apiURL}/api/empleadoCRUD/${selectedEmployee}`
      );
      const json = await response.json();
      setNombre(json.nombre);
      setApellido(json.apellido);
      setTelefono(json.telefono);
      setCedula(json.cedula);
      setdireccion(json.direccion);
      setusuario(json.usuario);
      setcontrasena(json.contrasena);
    };
    fetchEmployeeData();
  }, [selectedEmployee]);
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
        <span className="material-symbols-outlined">close</span>
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
            <input type="text" onChange={handleNombre} value={nombre} />
            <label>telefono</label>
            <input type="number" onChange={handleTelefono} value={telefono} />
            <label>dirección</label>
            <input type="text" onChange={handleDireccion} value={direccion} />
            <label>contraseña</label>
            <div className="password-field-div">
              <input
                className="password-field"
                type={showPassword ? "text" : "password"}
                onChange={handlecontrasena}
                value={contrasena}
              />
              <span
                className="material-symbols-outlined see"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                visibility_off
              </span>
            </div>
          </div>
          <div>
            <label>apellido</label>
            <input type="text" onChange={handleApellido} value={apellido} />
            <label>cedula</label>
            <input type="number" onChange={handleCedula} value={cedula} />
            <label>nombre de usuario</label>
            <input type="text" onChange={handleusuario} value={usuario} />
            <label>Confirmar contraseña</label>
            <div className="password-field-div">
              <input
                className="password-field"
                type={showPassword ? "text" : "password"}
                onChange={handlePassConfirm}
                value={passConfirm}
              />
              <span
                className="material-symbols-outlined see"
                onClick={() => {
                  setShowPassConfirm(!showPassConfirm);
                }}
              >
                visibility_off
              </span>
            </div>
          </div>
        </div>
        <button className="submit-btn">Editar empleado</button>
      </form>
    </div>
  );
};
export default EmployeeFormEdit;