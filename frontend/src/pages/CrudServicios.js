//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import ServiceAddForm from "../components/servicioCrud/ServiceAddForm";
//CUSTOM HOOKS
//COMPONENTS
import ServiceList from "../components/servicioCrud/ServiceList";
import ServiceEditForm from "../components/servicioCrud/ServiceEditForm";
import ServiceMoreForm from "../components/servicioCrud/ServiceMoreForm";
//STYLESHEET
import "../stylesheets/CrudServicios.css";
//ENV VARIABLES

//**************************************************************
const CrudServicios = () => {
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [editedService, setEditService] = useState(null);
  const [displayMore, setDisplayMore] = useState(false);
  const [moreService, setMoreService] = useState(null);

  const openEditForm = (service) => {
    if (service.estado !== "Terminado") {
      setEditService(service);
      setDisplayEdit(true);
    }
  };

  const closeEditForm = () => {
    setDisplayEdit(false);
  };

  const openMoreForm = (service) => {
    setMoreService(service);
    setDisplayMore(true);
  };

  const closeMoreForm = () => {
    setDisplayMore(false);
  };

  return (
    <div className="crudServicios-main">
      <div className="service-options">
        <div className="description">
          <h2>Módulo de gestión de servicios</h2>
          <p>
            Podrá ver la lista de servicios del negocio, crear servicios,
            editarlos y actualizar su estado.
          </p>
        </div>

        <div className="options-btns">
          <div
            className="empleado-manage-btn"
            onClick={() => {
              setDisplayCreate(!displayCreate);
            }}>
            Crear Servicio
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
        {displayMore && (
          <div className="div-background">
            <ServiceMoreForm
              moreOpen={displayMore}
              moreClose={closeMoreForm}
              moreService={moreService}
            />
          </div>
        )}
        <div
          className={
            displayCreate || displayEdit || displayMore
              ? "actual-list-none"
              : "actual-list"
          }>
          <ServiceList
            openEditForm={openEditForm}
            openMoreForm={openMoreForm}
          />
        </div>
      </div>
    </div>
  );
};
export default CrudServicios;
