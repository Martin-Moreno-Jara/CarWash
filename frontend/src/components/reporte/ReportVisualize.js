//************************** IMPORTED
//REACT HOOKS/IMPORTS
import { useState } from "react";
//STYLESHEET
import "../../stylesheets/ReportVisualize.css";
//**************************************************************

const ReportVisualize = () => {    
  
  return (
    <div className="main-container-report">
        <h2>Reporte</h2>     
        <div className="container-visualize">
            <div>
                <span data-cell="acciones" className="row-actions-report">
                    <div className="action-div-report showmore" >
                        <span className="material-symbols-outlined">refresh</span>
                    </div>
                    <div
                        className="action-div-report edit" >
                        <span className="material-symbols-outlined">download</span>
                    </div>
                    <div className="action-div-report delete" >
                        <span className="material-symbols-outlined">print</span>
                    </div>
                </span>
            </div>
            <div className="text-content">
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            <h2>Previsualización del reporte</h2>
            </div>
        </div>     
    </div>
  );
};
export default ReportVisualize;