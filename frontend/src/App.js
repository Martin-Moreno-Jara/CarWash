import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import FormTest from "./pages/FormTest";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeGeneral from "./pages/HomeGeneral";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import HomeAdmin from "./pages/HomeAdmin";
import HomeEmpleado from "./pages/HomeEmpleado";

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
              element={usuario ? <Navigate to="/admin" /> : <HomeGeneral />}
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
              element={usuario ? <HomeAdmin /> : <Navigate to="/" />}
            />
            <Route
              path="/empleado"
              element={usuario ? <HomeEmpleado /> : <Navigate to="/" />}
            />
            <Route path="/test" element={<FormTest></FormTest>}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
