import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import FormTest from "./pages/FormTest";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeGeneral from "./pages/HomeGeneral";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import HomeAdmin from "./pages/HomeAdmin";

function App() {
  const { usuario } = useAuthContext();
  console.log(usuario);
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
              element={!usuario ? <Login /> : <Navigate to="/admin" />}
            ></Route>
            <Route
              path="/admin"
              element={usuario ? <HomeAdmin /> : <Navigate to="/" />}
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
