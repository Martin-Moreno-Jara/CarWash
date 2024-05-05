//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import ServiceAddForm from "../components/servicioCrud/ServiceAddForm";
//CUSTOM HOOKS
//COMPONENTS
import ServiceList from "../components/servicioCrud/ServiceList";
import ServiceEditForm from "../components/servicioCrud/ServiceEditForm";
//STYLESHEET
import "../stylesheets/CrudServicios.css";
//ENV VARIABLES

//**************************************************************
const CrudServicios = () => {
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editedService, setEditService] = useState(null);

  

  const openEditForm = (service) => {
    setEditService(service);
    setDisplayEdit(true);
  };

  const closeEditForm = () => {
    setDisplayEdit(false);
  };

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
        {displayEdit && (
          <div className="div-background">
            <ServiceEditForm
              isOpen={displayEdit}
              onClose={closeEditForm}
              editedService={editedService}
            />
          </div>
        )}
        {displayCreate && (
          <div className="div-background">
            <ServiceAddForm
              displaySelf={displayCreate}
              setDisplay={setDisplayCreate}
            />
          </div>
        )}
        <div className={displayCreate || displayEdit ? "actual-list-none" : "actual-list"}>
          <ServiceList openEditForm={openEditForm} />
        </div>
      </div>
    </div>
  );
};
export default CrudServicios;
