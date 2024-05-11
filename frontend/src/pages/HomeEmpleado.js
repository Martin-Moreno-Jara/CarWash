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
          <h2>Bienvenido</h2>
          <p>
            En esta pantalla podrá ver, crear y editar tus servicios. En general podras manejar todos tus servicios.
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
