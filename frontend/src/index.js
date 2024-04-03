import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <EmployeeContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </EmployeeContextProvider>
  </AuthContextProvider>
);
