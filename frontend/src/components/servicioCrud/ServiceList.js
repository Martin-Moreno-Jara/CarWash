//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
//CUSTOM HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
//COMPONENTS
//STYLESHEET
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

//**************************************************************

const ServiceList = () => {
  const { usuario } = useAuthContext();
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchAllServies = async () => {
      const response = await fetch(`${apiURL}/api/servicioCRUD`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error(`no se pudo porque: ${json}`);
      }
      if (response.ok) {
        console.log(json);
        setServicios(json);
      }
    };
    const fetchServicesByEmployee = async () => {
      const response = await fetch(
        `${apiURL}/api/servicioCRUD/employee/${usuario.id}`,
        {
          headers: { Authorization: `Bearer ${usuario.token}` },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw Error(`no se pudo porque: ${json}`);
      }
      if (response.ok) {
        console.log(json);
        setServicios(json);
      }
    };
    if (usuario.rol === "administrador") {
      fetchAllServies();
    }
    if (usuario.rol === "empleado") {
      fetchServicesByEmployee();
    }
  }, [usuario.id, usuario.rol, usuario.token]);
  return (
    <div>
      {servicios && servicios.map((servicio) => <p>{servicio.cliente}</p>)}
    </div>
  );
};
export default ServiceList;
