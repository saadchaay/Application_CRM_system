import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/super_admin/AdminPanel";
import Dashboard from "./views/grow_yb/Dashboard";
import Index from "./views/user/Index";
function App() {


  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/super-dashboard" element={<Dashboard />} />
            <Route path="/dashboard" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;


  