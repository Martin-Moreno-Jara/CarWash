import "../stylesheets/EmployeeInfo.css";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useEmployeeCrudContext } from "../hooks/useEmployeeCrudContext";
import { useSelectContext } from "../hooks/useSelectContext";
const apiURL = process.env.REACT_APP_DEPLOYURL;
const EmployeeInfo = ({ id, nombre, apellido, usuario, telefono, cedula }) => {
  const { dispatch } = useEmployeeContext();
  const { showEdit, dispatch: dispatchEdit } = useEmployeeCrudContext();
  const { dispatch: dispatchIsSelected } = useSelectContext();

  const handleDelete = async () => {
    const response = await fetch(`${apiURL}/api/empleadoCRUD/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    dispatch({ type: "DELETE_EMPLEADO", payload: json });
  };
  return (
    <tr>
      <td data-cell="nombre">{`${nombre} ${apellido}`}</td>
      <td data-cell="usuario">{usuario}</td>
      <td data-cell="telefono">{telefono}</td>
      <td data-cell="cedula">{cedula}</td>
      <td data-cell="acciones" className="row-actions">
        <div className="action-div showmore">
          <span className="material-symbols-outlined">more_horiz</span>
        </div>

        <div className="action-div edit">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              dispatchEdit({ type: "SHOW_EDIT_DIALOG", payload: !showEdit });
              dispatchIsSelected({ type: "SELECT_EMPLOYEE", payload: id });
            }}
          >
            edit
          </span>
        </div>

        <div className="action-div delete" onClick={handleDelete}>
          <span className="material-symbols-outlined">delete</span>
        </div>
      </td>
    </tr>
  );
};
export default EmployeeInfo;
