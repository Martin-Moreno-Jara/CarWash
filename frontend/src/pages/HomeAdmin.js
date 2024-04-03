import "../stylesheets/HomeAdmin.css";
import { Link } from "react-router-dom";
const HomeAdmin = () => {
  return (
    <div className="homeAdmin-main">
      <div className="homeAdmin-info">Home del admin</div>
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
            <div className="empleado-manage-btn">Gestionar empleados</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
