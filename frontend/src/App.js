import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FormTest from "./pages/FormTest";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<h1>hello</h1>} />
            <Route path="/test" element={<FormTest></FormTest>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
