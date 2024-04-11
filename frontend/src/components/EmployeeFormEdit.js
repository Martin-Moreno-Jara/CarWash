import { useEffect, useState } from "react";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import { useSelectContext } from "../hooks/useSelectContext";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { usePatchEmployee } from "../hooks/usePatchEmployee";
import MoonLoader from "react-spinners/MoonLoader";
import "../stylesheets/EmployeeForm.css";
const apiURL = process.env.REACT_APP_DEVURL;

const EmployeeFormEdit = () => {
  const { patchEmployee, error, setError, isLoading } = usePatchEmployee();
  const { showEdit, dispatch } = useEmployeeCrudContext();
  const { dispatch: dispatchUpdate } = useEmployeeContext();
  const { selectedEmployee } = useSelectContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

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

      const keyPromise = await fetch(
        `${apiURL}/api/empleadoCRUD/key/${selectedEmployee}`
      );
      const jsonkey = await keyPromise.json();
      console.log(json);

      setNombre(json.nombre);
      setApellido(json.apellido);
      setTelefono(json.telefono);
      setCedula(json.cedula);
      setdireccion(json.direccion);
      setusuario(json.usuario);
      setcontrasena(jsonkey.key);
      setPassConfirm(jsonkey.key);
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
        setError("Las contraseñas no coinciden");
        return;
      }
      await patchEmployee(
        nombre,
        apellido,
        telefono,
        parseInt(cedula),
        direccion,
        usuario,
        contrasena,
        passConfirm
      );
    } else {
      setError("Todos los campos deben ser llenados");
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
      <h2>Ingrese la nueva información del empleado</h2>
      <div
        className="show-formats"
        onClick={() => {
          setShowFormats(!showFormats);
        }}
      >
        {showFormats ? "ocultar formatos" : "Mostrar formatos aceptados"}{" "}
        <span className="material-symbols-outlined">
          {showFormats ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </div>
      {showFormats && (
        <div className="formatos">
          <p>
            Tanto el nombre como el apellido solo aceptan letras del alfabeto
            español
          </p>
          <p>
            La contraseña asiganada debe tener mayúsculas, minúsculas, números y
            carácteres especiales{" "}
          </p>
          <p>
            El formato del número de teléfono deben 10 dígitos separados en dos
            grupos de 3 números y uno de 4 números, separados por un espacio.
            Como se muestra: <strong>320 330 4550</strong>
          </p>
          <p>
            El formato de la cédula deben ser 10 dígitos sin espacio entre ellos
          </p>
        </div>
      )}
      <form className="form-div" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]+"
              onChange={handleNombre}
              value={nombre}
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]+"
              onChange={handleApellido}
              value={apellido}
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              onChange={handleTelefono}
              value={telefono}
            />
          </div>
          <div>
            <label>Cédula</label>
            <input
              type="text"
              pattern="[0-9]{10}"
              onChange={handleCedula}
              value={cedula}
            />
          </div>
          <div>
            <label>Dirección</label>
            <input type="text" onChange={handleDireccion} value={direccion} />
          </div>
          <div>
            <label>Nombre de Usuario</label>
            <input type="text" onChange={handleusuario} value={usuario} />
          </div>
          <div>
            <label>Contraseña</label>
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
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>
          <div>
            <div>
              <label>Confirmar Contraseña</label>
              <div className="password-field-div">
                <input
                  className="password-field"
                  type={showPassConfirm ? "text" : "password"}
                  onChange={handlePassConfirm}
                  value={passConfirm}
                />
                <span
                  className="material-symbols-outlined see"
                  onClick={() => {
                    setShowPassConfirm(!showPassConfirm);
                  }}
                >
                  {showPassConfirm ? "visibility" : "visibility_off"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button className="submit-btn" disabled={isLoading}>
          Guardar Cambios
        </button>
      </form>
      {isLoading && (
        <div className="loading2">
          <MoonLoader color="#1c143d" loading={isLoading} size={100} />
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default EmployeeFormEdit;
