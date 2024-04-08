import carwashlogo from "../images/carwash-logo.jpg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { usuario } = useAuthContext();
  const { logout } = useLogout();
  const makeLogout = () => {
    logout();
  };
  return (
    <header>
      <div className="mainHeader-container">
        <Link to={"/"} className="logo-container">
          <img src={carwashlogo} alt="Logo de la aplicacion" />
          <h1>Carwash</h1>
        </Link>
        {usuario && (
          <div className="navbar-info">
            {usuario.rol} {usuario.usuario}
          </div>
        )}
        <nav>
          {!usuario && (
            <Link to={"/login"}>
              <div className="inicio-sesion-div">Iniciar sesión</div>
            </Link>
          )}
          {usuario && (
            <div className="inicio-sesion-div" onClick={makeLogout}>
              Cerrar sesión
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
