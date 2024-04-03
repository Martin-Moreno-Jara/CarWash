import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FormTest from "./pages/FormTest";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeGeneral from "./pages/HomeGeneral";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomeGeneral></HomeGeneral>} />
            <Route path="/test" element={<FormTest></FormTest>}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
