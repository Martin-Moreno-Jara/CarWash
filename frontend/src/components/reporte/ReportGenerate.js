//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
import { useReportContext } from "../../hooks/reporteHooks/useReportContext";
//CUSTOM HOOKS

//STYLESHEET
import "../../stylesheets/ReportGenerate.css";
//**************************************************************

const ReporteGenerate = () => {    
  
  const [showServices, setShowServices] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
   
  };

  return (
    <div className="main-container-report">
        <h2>Opciones de personalización</h2>          
        <form className="form-div-report"  onSubmit={handleSubmit}>
            <div className="form-fields-report">
            <div>
                <label>Fecha de inicio:</label>
                <select className="form-select">
                  <option></option>
                  <option>1</option>
                </select>
            </div>
            <div>
                <label>Fecha de fin:</label>
                <select className="form-select">
                  <option></option>
                  <option>1</option>
                </select>
            </div>
            <div>
                <div
                    className="show-formats-report"
                    onClick={() => {
                    setShowServices(!showServices);
                    }}
                >
                    Servicios
                    <span className="material-symbols-outlined">
                    {showServices ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
                </div>
                {showServices && (
                    <div className="formatos-report">
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Cantidad de servicios terminados
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Dinero recuadado
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Tipos de servicios prestados
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Proporción de tipos de autos
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Calificación de los servicios
                    </label>
                    </div>
                )}
            </div>
            <div >
                <div
                    className="show-formats-report"
                    onClick={() => {
                    setShowEmployees(!showEmployees);
                    }}
                >
                    Empleados
                    <span className="material-symbols-outlined">
                    {showEmployees ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
                </div>
                {showEmployees && (
                    <div className="formatos-report">
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Servicios completados
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Cantidad de dinero recuadada
                    </label>
                    <label className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checkbox-custom"></span>
                        Calificación de los servicios
                    </label>
                    </div>
                )}
            </div>
            </div>
            <button className="submit-btn" type="submit">Generar Reporte</button>
        </form>
    </div>
  );
};
export default ReporteGenerate;