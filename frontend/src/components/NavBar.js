import carwashlogo from "../images/carwash-logo.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="mainHeader-container">
        <div className="logo-container">
          <Link to={"/"}>
            <img src={carwashlogo} alt="Logo de la aplicacion" />
            <h1>Carwash</h1>
          </Link>
        </div>
        <nav>
          <Link to={"/login"}>
            <div className="inicio-sesion-div">Iniciar sesión</div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
