//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import { useReportContext } from "../../hooks/reporteHooks/useReportContext";
//CUSTOM HOOKS

//STYLESHEET
import "../../stylesheets/ReportGenerate.css";
const apiURL = process.env.REACT_APP_DEVURL;

//**************************************************************

const ReporteGenerate = () => {
  const { showGenerate, dispatch } = useReportContext();
  const [fechainicio, setFechaInicio] = useState("");
  const [fechafin, setFechaFin] = useState("");
  const [serviciosterminados, setServiciosTerminados] = useState(false);
  const [dinerorecaudado, setDineroRecaudado] = useState(false);
  const [serviciosprestados, setServiciosPrestados] = useState(false);
  const [proporciontiposautos, setProporcionTiposAutos] = useState(false);
  const [calificacionservicios, setCalificacionServicios] = useState(false);
  const [empservicioscompletados, setEmpServiciosCompletados] = useState(false);
  const [empdinerorecaudado, setEmpDineroRecaudado] = useState(false);
  const [empcalificacionservicios, setEmpCalificacionServicios] =
    useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const handleFechaInicio = (e) => {
    setFechaInicio(e.target.value);
    if (fechafin && new Date(e.target.value) > new Date(fechafin)) {
      setError("La fecha de inicio no puede ser posterior a la fecha de fin");
    } else {
      setError("");
    }
  };
  const handleFechaFin = (e) => {
    setFechaFin(e.target.value);
    if (fechainicio && new Date(e.target.value) < new Date(fechainicio)) {
      setError("La fecha de fin no puede ser anterior a la fecha de inicio");
    } else {
      setError("");
    }
  };
  const handleServiciosTerminados = (e) => {
    setServiciosTerminados(e.target.value);
  };
  const handleDineroRecaudado = (e) => {
    setDineroRecaudado(e.target.value);
  };
  const handleServiciosPrestados = (e) => {
    setServiciosPrestados(e.target.value);
  };
  const handleProporcionTiposAutos = (e) => {
    setProporcionTiposAutos(e.target.value);
  };
  const handleCalificacionServicios = (e) => {
    setCalificacionServicios(e.target.value);
  };
  const handleEmpServiciosCompletados = (e) => {
    setEmpServiciosCompletados(e.target.value);
  };
  const handleEmpDineroRecaudado = (e) => {
    setEmpDineroRecaudado(e.target.value);
  };
  const handleEmpCalificacionServicios = (e) => {
    setEmpCalificacionServicios(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!error) {
      const servicios = {
        recaudo: dinerorecaudado,
        numServicios: serviciosterminados,
        servicesPerCar: serviciosprestados,
        ranking: calificacionservicios,
      };
      const empleados = {
        numEmpleados: true,
        numServiciosEmpleado: empservicioscompletados,
        recaudoEmpleado: empdinerorecaudado,
        calificacion: empcalificacionservicios,
      };
      const sendData = await fetch(`${apiURL}/api/reporte/CreatePDF`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initDate: fechainicio,
          endDate: fechafin,
          servicios,
          empleados,
        }),
      });
      const sendResponse = await sendData.json();
      console.log(sendResponse);

      console.log("Formulario enviado");
      dispatch({ type: "VISUALIZE", payload: !showGenerate });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="main-container-report">
      <h2>Opciones de personalización</h2>
      <form className="form-div-report" onSubmit={handleSubmit}>
        <div className="form-fields-report">
          <div>
            <label>Fecha de inicio:</label>
            <input
              type="date"
              className="form-control"
              value={fechainicio}
              onChange={handleFechaInicio}
            />
          </div>
          <div>
            <label>Fecha de fin:</label>
            <input
              type="date"
              className="form-control"
              value={fechafin}
              onChange={handleFechaFin}
            />
          </div>
          <div>
            <div
              className="show-formats-report"
              onClick={() => {
                setShowServices(!showServices);
              }}>
              Servicios
              <span className="material-symbols-outlined">
                {showServices ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </div>
            {showServices && (
              <div className="formatos-report">
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleServiciosTerminados}
                  />
                  <span className="checkbox-custom"></span>
                  Cantidad de servicios terminados
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox "
                    onChange={handleDineroRecaudado}
                  />
                  <span className="checkbox-custom"></span>
                  Dinero recuadado
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleServiciosPrestados}
                  />
                  <span className="checkbox-custom"></span>
                  Tipos de servicios prestados
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleProporcionTiposAutos}
                  />
                  <span className="checkbox-custom"></span>
                  Proporción de tipos de autos
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleCalificacionServicios}
                  />
                  <span className="checkbox-custom"></span>
                  Calificación de los servicios
                </label>
              </div>
            )}
          </div>
          <div>
            <div
              className="show-formats-report"
              onClick={() => {
                setShowEmployees(!showEmployees);
              }}>
              Empleados
              <span className="material-symbols-outlined">
                {showEmployees ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </div>
            {showEmployees && (
              <div className="formatos-report">
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleEmpServiciosCompletados}
                  />
                  <span className="checkbox-custom"></span>
                  Servicios completados
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleEmpDineroRecaudado}
                  />
                  <span className="checkbox-custom"></span>
                  Cantidad de dinero recuadada
                </label>
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    className="checklist-checkbox"
                    onChange={handleEmpCalificacionServicios}
                  />
                  <span className="checkbox-custom"></span>
                  Calificación de los servicios
                </label>
              </div>
            )}
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Generar Reporte
        </button>
      </form>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="content-container">
              <h2>No se puede enviar el formulario</h2>
              <p>{error}</p>
              <button
                className="reject-button"
                onClick={() => {
                  setIsOpen(false);
                }}>
                Regresar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReporteGenerate;
