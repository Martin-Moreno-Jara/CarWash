//************************** IMPORTED
//REACT HOOKS/IMPORTS
import React from "react";
import ReactDOM from "react-dom/client";
//CONTEXT PROVIDER
import { AuthContextProvider } from "./context/AuthContext";
import { EmployeeContextProvider } from "./context/empleadoContextos/EmployeeContext";
import { EmployeeCrudContextProvider } from "./context/empleadoContextos/EmployeeCrudContext";
import { SelectContextProvider } from "./context/empleadoContextos/SelectContext";
//COMPONENTS
import App from "./App";
//STYLESHEET
import "./index.css";
import { ServiceContextProvider } from "./context/servicioContext/ServiceContext";
//**************************************************************

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <EmployeeContextProvider>
      <EmployeeCrudContextProvider>
        <ServiceContextProvider>
          <SelectContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </SelectContextProvider>
        </ServiceContextProvider>
      </EmployeeCrudContextProvider>
    </EmployeeContextProvider>
  </AuthContextProvider>
);
