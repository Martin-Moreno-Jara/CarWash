import React from "react";
import "../../stylesheets/ServiceActions.css";

const ServiceActions = ({
  onEdit,
  rowInfo,
  showConfirmation,
  setShowConfirmation,
  setSelectedRow,
}) => {
  const confirmation = () => {
    setShowConfirmation(true);
    setSelectedRow(rowInfo);
  };

  return (
    <span data-cell="acciones" className="row-actions">
      <div className="action-div showmore">
        <span className="material-symbols-outlined">more_horiz</span>
      </div>

      <div className="action-div edit" onClick={onEdit}>
        <span className="material-symbols-outlined">edit</span>
      </div>

      <div className="action-div delete">
        <span className="material-symbols-outlined">delete</span>
      </div>
      <div className="action-div complete">
        <span className="material-symbols-outlined" onClick={confirmation}>
          Done
        </span>
      </div>
    </span>
  );
};
export default ServiceActions;
