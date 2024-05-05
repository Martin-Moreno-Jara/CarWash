//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
//CUSTOM HOOKS
import { useLogin } from "../hooks/usuarioHooks/useLogin";
//STYLESHEET
import "../stylesheets/Login.css";
//**************************************************************

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleNombreUsuario = (e) => {
    setNombreUsuario(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombreUsuario, password);
    await login(nombreUsuario, password);
  };

  return (
    <div className="overall-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="instruction-div">
          <h2>Inicio de sesión</h2>
          <p>Ingrese las credenciales para ingresar a la aplicación</p>
        </div>
        <div className="fields">
          <label>Nombre de usuario</label>
          <input type="text" onChange={handleNombreUsuario} />
          <label>Contraseña</label>
          <input type="password" onChange={handlePassword} />
        </div>
        <button className="login-btn" disabled={isLoading}>
          Iniciar Sesión
        </button>
        {isLoading && (
          <div className="loading">
            <MoonLoader color="#1c143d" loading={isLoading} size={100} />
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
