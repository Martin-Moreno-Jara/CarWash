import React from "react";

//************************** IMPORTED
//CUSTOM HOOKS
import { useServiceContext } from "../../hooks/servicioHooks/useServiceContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSnackbar } from "notistack";
import { useState } from 'react';
//STYLESHEET
import "../../stylesheets/ServiceInfo.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

const ServiceActions = ({ onEdit, onMore, id}) => {
  const { dispatch } = useServiceContext();
    const { usuario: loggedUser } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmar, setConfirmar] = useState(false);
    
    const handleConfirm = async () => {
        handleDelete();
        setIsOpen(false);
    };

    const handleDelete = async () => {
      const response = await fetch(`${apiURL}/api/servicioCRUD/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      });
      const json = await response.json();
      if (!response.ok) {
        enqueueSnackbar("Error al eliminar servicio", { variant: "error" });
      }
      if (response.ok) {
        dispatch({ type: "DELETE_SERVICE", payload: json });
        enqueueSnackbar("Servicio eliminado correctamente", { variant: "success" });
      }
    };

  return (
    <span data-cell="acciones" className="row-actions">
      <div className="action-div showmore" onClick={onMore}>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>

      <div className="action-div edit" onClick={onEdit}> 
        <span className="material-symbols-outlined">edit</span>
      </div>

      <div className="action-div delete" onClick={() => {setIsOpen(true)}}>
        <span className="material-symbols-outlined">delete</span>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="content-container">
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro de que quieres hacer esto?</p>
                <button className="accept-button" onClick={handleConfirm}>Aceptar</button>
                <button className="reject-button" onClick={() => {setIsOpen(false)}}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="action-div complete">
        <span className="material-symbols-outlined">Done</span>
      </div>
    </span>
  );
};
export default ServiceActions;
