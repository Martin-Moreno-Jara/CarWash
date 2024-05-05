//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { Link } from "react-router-dom";
//STYLESHEET
import "../stylesheets/HomeEmpleado.css";
//**************************************************************

const HomeEmpleado = () => {
  return (
    <div className="homeAdmin-main">
      <div className="homeAdmin-info"></div>
      <div className="homeAdmin-options">
        <div className="options-text">
          <h2>Bienvenido administrador</h2>
          <p>
            En esta pantalla podrá ver, crear editar, y en general hacer manejo
            de los empleados del carwash. Además del control del negocio.
          </p>
        </div>
        <div className="options-btns">
          <Link to="/empleado/servicioCrud">
            <div className="empleado-manage-btn">Gestionar servicios</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeEmpleado;
