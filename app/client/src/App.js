import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/auth/AdminPanel";
import Dashboard from "./views/grow_yb/Dashboard";
import Index from "./views/user/Index";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Logout from "./views/auth/Logout";
import Details from "./views/grow_yb/Details";


function App() {

  return (
      <div>
          <Routes>
              <Route path="/" element={<Layout />} > 

                  {/* For Admin or Client */}
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin/login" element={<AdminPanel />} />
                  <Route path="/logout" element={<Logout />} />
                  
                  {/* Protect this Routes for super Admin */}
                    <Route element={<RequiredAuth />}>
                        <Route path="/super-dashboard" element={<Dashboard />} />
                        <Route path="/admin/:id" element={<Details />} />
                    </Route>

                  {/* For Admin when Auth */}
                  <Route path="/dashboard" element={<Index />} />

                  {/* For Client when Auth */}
              </Route>
          </Routes>
      </div>
    );
}

export default App;


  