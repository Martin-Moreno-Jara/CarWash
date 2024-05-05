//************************** IMPORTED
//CUSTOM HOOKS
import { useEmployeeContext } from "../../hooks/empleadoHooks/useEmployeeContext";
import { useEmployeeCrudContext } from "../../hooks/empleadoHooks/useEmployeeCrudContext";
import { useSelectContext } from "../../hooks/empleadoHooks/useSelectContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//STYLESHEET
import "../../stylesheets/EmployeeInfo.css";
//ENV VARIABLES
const apiURL = process.env.REACT_APP_DEVURL;
//**************************************************************

const EmployeeInfo = ({ id }) => {
  const { dispatch } = useEmployeeContext();
  const { showEdit, dispatch: dispatchEdit } = useEmployeeCrudContext();
  const { dispatch: dispatchIsSelected } = useSelectContext();
  const { usuario: loggedUser } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(`${apiURL}/api/empleadoCRUD/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${loggedUser.token}` },
    });
    const json = await response.json();

    dispatch({ type: "DELETE_EMPLEADO", payload: json });
  };
  return (
    <span data-cell="acciones" className="row-actions">
      <div className="action-div showmore">
        <span className="material-symbols-outlined">more_horiz</span>
      </div>

      <div className="action-div edit">
        <span
          className="material-symbols-outlined"
          onClick={() => {
            dispatchEdit({ type: "SHOW_EDIT_DIALOG", payload: !showEdit });
            dispatchIsSelected({ type: "SELECT_EMPLOYEE", payload: id });
          }}>
          edit
        </span>
      </div>

      <div className="action-div delete" onClick={handleDelete}>
        <span className="material-symbols-outlined">delete</span>
      </div>
    </span>
  );
};
export default EmployeeInfo;
