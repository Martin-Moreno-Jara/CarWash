import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { EmployeeCrudContextProvider } from "./context/EmployeeCrudContext";
import { SelectContextProvider } from "./context/SelectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <EmployeeContextProvider>
      <EmployeeCrudContextProvider>
        <SelectContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SelectContextProvider>
      </EmployeeCrudContextProvider>
    </EmployeeContextProvider>
  </AuthContextProvider>
);
