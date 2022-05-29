import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";

function App() {


  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;


  