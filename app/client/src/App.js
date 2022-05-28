import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";

function App() {


  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;


  