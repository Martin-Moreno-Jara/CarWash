import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeGeneral from "./pages/HomeGeneral";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import HomeAdmin from "./pages/HomeAdmin";
import HomeEmpleado from "./pages/HomeEmpleado";
import CrudEmpleados from "./pages/CrudEmpleados";
import { EmployeeContextProvider } from "./context/EmployeeContext";

function App() {
  const { usuario } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                usuario ? (
                  usuario.rol === "administrador" ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/empleado" />
                  )
                ) : (
                  <HomeGeneral />
                )
              }
            />
            <Route
              path="/login"
              element={
                !usuario ? (
                  <Login />
                ) : usuario.rol === "administrador" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/empleado" />
                )
              }
            ></Route>
            <Route
              path="/admin"
              element={
                usuario && usuario.rol === "administrador" ? (
                  <HomeAdmin />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/empleado"
              element={
                usuario && usuario.rol === "empleado" ? (
                  <HomeEmpleado />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin/empleadoCrud"
              element={
                usuario && usuario.rol === "administrador" ? (
                  <CrudEmpleados />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
