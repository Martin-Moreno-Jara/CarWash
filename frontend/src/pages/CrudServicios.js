//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import ServiceAddForm from "../components/servicioCrud/ServiceAddForm";
//CUSTOM HOOKS
//COMPONENTS
//STYLESHEET
//ENV VARIABLES

//**************************************************************
const CrudServicios = () => {
  const [displayCreate, setDisplayCreate] = useState(false);
  return (
    <div className="crudEmpleados-main">
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
