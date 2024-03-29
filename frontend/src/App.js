import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return(
    <div className="App">
        <BrowserRouter>
            <div className="pages">
                <Routes>
                    <Route
                        path="/"
                        element={}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
