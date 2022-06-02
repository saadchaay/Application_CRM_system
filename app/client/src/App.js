import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/auth/AdminPanel";
import Logout from "./views/auth/Logout";
import Dashboard from "./views/super_admin/Dashboard";
import Index from "./views/app_system/Dashboard";
import Details from "./views/super_admin/Details";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Main from "./components/system/Main";
import Users from "./components/system/Users";


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
                  {/* <Route path="/logout" element={<Logout />} /> */}
            
             </Route>

                  {/* Protect this Routes for super Admin */}
                    <Route element={<RequiredAuth />}>
                        <Route path="/super-dashboard" element={<Dashboard />} />
                        <Route path="/admin/:id" element={<Details />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>

                  {/* For Admin when Auth */}
                    <Route path="/dashboard" element={<Index contentMain={<Main />} />} />
                    <Route path="/users" element={<Index contentUsers={<Users />} />} />
                    {/* <Route path="/dashboard" element={<Index contentMain={<Main />} />} /> */}
                    {/* <Route path="/logout" element={<Logout />} />
                    <Route path="Orders" element={<Index />} />   */}
                    {/* <Index /> */}

                  {/* For Client when Auth */}
              {/* </Route> */}
          </Routes>
      </div>
    );
}

export default App;


  