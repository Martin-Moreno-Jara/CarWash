//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useEffect, useState } from "react";
import ServiceAddForm from "../components/servicioCrud/ServiceAddForm";
//CUSTOM HOOKS
import { useAuthContext } from "../hooks/useAuthContext";
//COMPONENTS
//STYLESHEET
import "../stylesheets/CrudServicios.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

//**************************************************************
const CrudServicios = () => {
  const { usuario } = useAuthContext();

  const [displayCreate, setDisplayCreate] = useState(false);
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
      }
    };
    const fetchServicesByEmployee = async () => {};
    if (usuario.rol === "administrador") {
      fetchAllServies();
    }
    if (usuario.rol === "empleado") {
      console.log("traer pal empleado");
    }
  }, []);
  return (
    <div className="crudServicios-main">
      <div className="empleado-options">
        <div className="description">
          <h2>Modulo de gestión de servicios</h2>
          <p>
            Podrá ver la lista de servicios del negocio, crear servicios,
            editarlos y actualizar su estado
          </p>
        </div>

        <div className="options-btns">
          <div
            className="empleado-manage-btn"
            onClick={() => {
              setDisplayCreate(!displayCreate);
            }}
          >
            Crear servicio
          </div>
        </div>
      </div>
      <div className="div-list">
        {displayCreate && (
          <div className="div-background">
            <ServiceAddForm
              displaySelf={displayCreate}
              setDisplay={setDisplayCreate}
            />
          </div>
        )}
        {/* {<div className="div-background"></div>}
        <div className={"actual-list"}></div> */}
      </div>
    </div>
  );
};
export default CrudServicios;
