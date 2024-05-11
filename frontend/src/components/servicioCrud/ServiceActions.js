import React from "react";
import "../../stylesheets/ServiceActions.css";

//************************** IMPORTED
//CUSTOM HOOKS
import { useServiceContext } from "../../hooks/servicioHooks/useServiceContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSnackbar } from "notistack";
import { useState } from "react";
//STYLESHEET
import "../../stylesheets/ServiceInfo.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;

const ServiceActions = ({
  onEdit,
  onMore,
  id,
  estado,
  showConfirmation,
  setShowConfirmation,
  setSelectedRow,
}) => {
  const { dispatch } = useServiceContext();
  const { usuario: loggedUser } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [showCompletedError, setShowCompletedError] = useState(false);

  const handleConfirm = async () => {
    handleDelete();
    setIsOpen(false);
  };

  const handleEdit = () => {
    if (estado === "Terminado") {
      setShowCompletedError(true);
    } else {
      onEdit(); // Llama a la función onEdit si el servicio no está completado
    }
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
      enqueueSnackbar("Servicio eliminado correctamente", {
        variant: "success",
      });
    }
  };

  return (
    <span data-cell="acciones" className="row-actions">
      <div className="action-div showmore" onClick={onMore}>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>

      <div
        className="action-div edit"
        onClick={(event) => {
          onEdit();
          handleEdit();
        }}>
        <span className="material-symbols-outlined">edit</span>
      </div>

      <div
        className="action-div delete"
        onClick={() => {
          setIsOpen(true);
        }}>
        <span className="material-symbols-outlined">delete</span>
      </div>

      <div className="action-div complete">
        <span className="material-symbols-outlined" onClick={confirmation}>
          Done
        </span>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="content-container">
              <h2>Confirmar Eliminación</h2>
              <p>¿Estás seguro de que quieres hacer esto?</p>
              <button className="accept-button" onClick={handleConfirm}>
                Aceptar
              </button>
              <button
                className="reject-button"
                onClick={() => {
                  setIsOpen(false);
                }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompletedError && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="content-container">
              <h2>Servicio completado</h2>
              <p>El servicio ya ha sido completado y no se puede editar.</p>
              <button
                className="accept-button"
                onClick={() => setShowCompletedError(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
export default ServiceActions;
