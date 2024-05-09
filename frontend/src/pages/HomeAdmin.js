//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { Link } from "react-router-dom";
//STYLESHEET
import "../stylesheets/HomeAdmin.css";
//**************************************************************

const HomeAdmin = () => {
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
          <Link to="/admin/empleadoCrud">
            <div className="empleado-manage-btn">Gestionar Empleados</div>
          </Link>

          <Link to="/admin/servicioCrud">
            <div className="empleado-manage-btn">Gestionar servicios</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
