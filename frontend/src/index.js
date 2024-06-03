//************************** IMPORTED
//REACT HOOKS/IMPORTS
import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
//CONTEXT PROVIDER
import { AuthContextProvider } from "./context/AuthContext";
import { EmployeeContextProvider } from "./context/empleadoContextos/EmployeeContext";
import { EmployeeCrudContextProvider } from "./context/empleadoContextos/EmployeeCrudContext";
import { SelectContextProvider } from "./context/empleadoContextos/SelectContext";
import { ReportContextProvider } from "./context/reporteContextos/ReportContext";
//COMPONENTS
import App from "./App";
//STYLESHEET
import "./index.css";
import { ServiceContextProvider } from "./context/servicioContext/ServiceContext";
//**************************************************************

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ReportContextProvider>
      <EmployeeContextProvider>
        <EmployeeCrudContextProvider>
          <ServiceContextProvider>
            <SelectContextProvider>
              <React.StrictMode>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </React.StrictMode>
            </SelectContextProvider>
          </ServiceContextProvider>
        </EmployeeCrudContextProvider>
      </EmployeeContextProvider>
    </ReportContextProvider>
  </AuthContextProvider>
);
