const ServiceActions = () => {
  return (
    <span data-cell="acciones" className="row-actions">
      <div className="action-div showmore">
        <span className="material-symbols-outlined">more_horiz</span>
      </div>

      <div className="action-div edit">
        <span className="material-symbols-outlined">edit</span>
      </div>

      <div className="action-div delete">
        <span className="material-symbols-outlined">delete</span>
      </div>
      <div className="action-div complete">
        <span className="material-symbols-outlined">Done</span>
      </div>
    </span>
  );
};
export default ServiceActions;
