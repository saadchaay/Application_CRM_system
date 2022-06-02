import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/auth/AdminPanel";
import Logout from "./views/auth/Logout";
import Dashboard from "./views/super_admin/Dashboard";
import System from "./views/system/Dashboard";
import Details from "./views/super_admin/Details";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Main from "./components/system/Dashboard";
import Users from "./components/system/Users";
import Orders from "./components/system/Orders";
import Customers from "./components/system/Customers";
import Products from "./components/system/Products";
import Categories from "./components/system/Categories";


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
                    <Route path="/dashboard" element={<System contentMain={<Main />} />} />
                    <Route path="/users" element={<System contentUsers={<Users />} />} />
                    <Route path="/orders" element={<System contentOrders={<Orders />} />} />
                    <Route path="/customers" element={<System contentCustomers={<Customers />} />} />
                    <Route path="/products" element={<System contentProducts={<Products />} />} />
                    <Route path="/categories" element={<System contentCategories={<Categories />} />} />
                    
                    {/* <System /> */}

                  {/* For Client when Auth */}
              {/* </Route> */}
          </Routes>
      </div>
    );
}

export default App;


  