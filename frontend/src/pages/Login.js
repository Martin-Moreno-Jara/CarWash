import "../stylesheets/Login.css";
const Login = () => {
  return (
    <div className="overall-container">
      <form className="form-container">
        <div className="instruction-div">
          <h2>Inicio de sesión</h2>
          <p>Ingrese las credenciales para ingresar a la aplicación</p>
        </div>
        <div className="fields">
          <label>Nombre de usuario</label>
          <input type="text" />
          <label>Contraseña</label>
          <input type="password" />
        </div>
        <button className="login-btn">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
