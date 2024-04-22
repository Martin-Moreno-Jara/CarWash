//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { Link } from "react-router-dom";
//CUSTOM HOOKS
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
//COMPONENTS
import carwashlogo from "../images/carwash-logo.jpg";
//**************************************************************

const NavBar = () => {
  const { usuario } = useAuthContext();
  const { logout } = useLogout();
  const makeLogout = async () => {
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
            {usuario.rol} <strong>{usuario.usuario}</strong>
          </div>
        )}
        <nav>
          {!usuario && (
            <Link to={"/login"}>
              <div className="inicio-sesion-div">Iniciar Sesión</div>
            </Link>
          )}
          {usuario && (
            <div className="cerrar-sesion-div" onClick={makeLogout}>
              Cerrar Sesión
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
