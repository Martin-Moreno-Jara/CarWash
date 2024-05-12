//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
//CUSTOM HOOKS
import { useEmployeeCrudContext } from "../../hooks/empleadoHooks/useEmployeeCrudContext";
import { useSelectContext } from "../../hooks/empleadoHooks/useSelectContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePatchEmployee } from "../../hooks/empleadoHooks/usePatchEmployee";
//STYLESHEET
import "../../stylesheets/EmployeeForm.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

const EmployeeFormMore = () => {
  const { patchEmployee, error, isLoading } = usePatchEmployee();
  const { showMore, dispatch } = useEmployeeCrudContext();
  const { selectedEmployee } = useSelectContext();
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

      const nombreCapitalizado = json.nombre.charAt(0).toUpperCase() + json.nombre.slice(1);
      const apellidoCapitalizado = json.apellido.charAt(0).toUpperCase() + json.apellido.slice(1);

      setNombre(nombreCapitalizado);
      setApellido(apellidoCapitalizado);
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
          dispatch({ type: "SHOW_MORE_DIALOG", payload: !showMore });
        }}
      >
        <span className="material-symbols-outlined">close</span>
      </div>
      <h2>información del empleado</h2>
    

      {loadingInfo && (
        <div className="loading2">
          <MoonLoader color="#1c143d" loading={loadingInfo} size={100} />
        </div>
      )}
      <form className="form-div" onSubmit={handleSubmit}>
        <div className="form-fieldsMore">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
              onChange={handleNombre}
              value={nombre}
              readOnly
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ ]+"
              onChange={handleApellido}
              value={apellido}
              readOnly
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              onChange={handleTelefono}
              value={telefono}
              readOnly
            />
          </div>
          <div>
            <label>Cédula</label>
            <input
              type="text"
              pattern="[0-9]{10}"
              onChange={handleCedula}
              value={cedula}
              readOnly
            />
          </div>
          <div>
            <label>Dirección</label>
            <input type="text" onChange={handleDireccion} value={direccion} readOnly />      
          </div>
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              onChange={handleusuario}
              value={usuario}
              autoComplete="off"
              readOnly
            />
          </div>
        </div>
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
export default EmployeeFormMore;