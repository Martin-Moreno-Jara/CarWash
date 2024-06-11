//************************** IMPORTED
//CUSTOM HOOKS
import { useReportContext } from "../hooks/reporteHooks/useReportContext";
import { useState } from "react";
import { useEffect } from "react";
//COMPONENTS
import ReporteGenerate from "../components/reporte/ReportGenerate";
import ReportVisualize from "../components/reporte/ReportVisualize";
//STYLESHEET
import "../stylesheets/CrudEmpleados.css";
//**************************************************************

const GenerarReporte = () => {
  const { showGenerate, dispatch } = useReportContext();
  useEffect(() => {
    dispatch({ type: "GENERATE", payload: true });
  }, [dispatch]);

  console.log(showGenerate);

  return (
    <div className="crudEmpleados-main">
      <div className="empleado-options">
        <div className="description">
          <h2>Módulo de reporte de rendimiento</h2>
          <p>
            Podrá generar un informe del rendimiento del autolavado y, 
            además, seleccionar los apartados de interés.
          </p>
        </div>
        {!showGenerate && (
          <div className="options-btns">
            <div
              className="empleado-manage-btn"
              onClick={() => {
                dispatch({ type: "GENERATE", payload: !showGenerate });
              }}>
              Volver
            </div>
          </div>
        )}
      </div>
      {showGenerate && (
        <div className="div-list-dark">
          <div className="div-background">
            <ReporteGenerate />
          </div>
        </div>
      )}
      {!showGenerate && (
        <div className="div-list-dark">
          <div className="div-background">
            <ReportVisualize />
          </div>
        </div>
      )}
    </div>
  );
};
export default GenerarReporte;
