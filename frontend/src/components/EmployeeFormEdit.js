//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
//CUSTOM HOOKS
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import { useSelectContext } from "../hooks/useSelectContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePatchEmployee } from "../hooks/usePatchEmployee";
//STYLESHEET
import "../stylesheets/EmployeeForm.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

const EmployeeFormEdit = () => {
  const { patchEmployee, error, isLoading } = usePatchEmployee();
  const { showEdit, dispatch } = useEmployeeCrudContext();
  const { selectedEmployee } = useSelectContext();

  const [showFormats, setShowFormats] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setdireccion] = useState("");
  const [usuario, setusuario] = useState("");

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

  const { usuario: loggedUser } = useAuthContext();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoadingInfo(true);
      const response = await fetch(
        `${apiURL}/api/empleadoCRUD/${selectedEmployee}`,
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      const json = await response.json();

      if (response.ok) {
        setLoadingInfo(false);
      }
      if (!response.ok) {
        setLoadingInfo(false);
      }
      console.log(json.usuario);

      setNombre(json.nombre);
      setApellido(json.apellido);
      setTelefono(json.telefono);
      setCedula(json.cedula);
      setdireccion(json.direccion);
      setusuario(json.usuario);
    };
    fetchEmployeeData();
  }, [selectedEmployee, loggedUser.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patchEmployee(
      nombre,
      apellido,
      telefono,
      parseInt(cedula),
      direccion,
      usuario
    );
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
      {loadingInfo && (
        <div className="loading2">
          <MoonLoader color="#1c143d" loading={loadingInfo} size={100} />
        </div>
      )}
      <form className="form-div" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
              onChange={handleNombre}
              value={nombre}
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
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
            <input
              type="text"
              onChange={handleusuario}
              value={usuario}
              autoComplete="off"
            />
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
