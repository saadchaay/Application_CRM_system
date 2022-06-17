import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/auth/AdminPanel";
import Logout from "./views/auth/Logout";
import Signout from "./views/auth/Signout";
import Dashboard from "./views/super_admin/Dashboard";
import System from "./views/system/Dashboard";
import Details from "./views/super_admin/Details";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Required from "./components/Required";
import Unauthorized from "./components/Unauthorized";
import Main from "./components/system/Dashboard";
import Users from "./components/system/Users";
import Orders from "./components/system/Orders";
import Customers from "./components/system/Customers";
import Products from "./components/system/Products";
import Categories from "./components/system/Categories";
import Account from "./components/system/Account";
import Integration from "./components/system/Integration";
import Profile from "./components/system/account/Profile";
import Settings from "./components/system/account/Settings";
import Password from "./components/system/account/Password";
import Product from "./components/system/details/Product";
import Order from "./components/system/details/Order";


const roles = {
  superAdmin: "superAdmin",
  admin: "admin",
  stockManager: "stockManager",
  agentCustomer: "agentCustomer",
  shipManager: "shipManager",
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/sign-out" element={<Signout />} />
        <Route path="/" element={<Layout />}>
          {/* For Admin or Client */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminPanel />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Protect this Routes for super Admin */}
        <Route element={<RequiredAuth />}>
          <Route path="/super-dashboard" element={<Dashboard />} />
          <Route path="/admin/:id" element={<Details />} />
        </Route>

        {/* For Admin when Auth */}
      <Route element={<Required allowedRoles={[roles.admin, roles.agentCustomer, roles.stockManager, roles.shipManager]} />}>
        <Route
            path="/dashboard"
            element={<System contentMain={<Main />} />}
          />
        <Route
            path="account/profile"
            element={<System contentAccount={<Account profile={<Profile />} />} />}
          />
          <Route
            path="account/settings"
            element={<System contentAccount={<Account settings={<Settings />} />} />}
          />
          <Route
            path="account/password"
            element={<System contentAccount={<Account password={<Password />} />} />}
          />
      </Route>
      <Route element={<Required allowedRoles={[roles.admin]} />}>
          <Route path="/users" element={<System contentUsers={<Users />} />} />
          <Route path="/integration" element={<System contentIntegration={<Integration />} />} />
      </Route>

      <Route element={<Required allowedRoles={[roles.admin, roles.agentCustomer, roles.shipManager]} />}>
          <Route
            path="/orders"
            element={<System contentOrders={<Orders />} />}
          />
          <Route
            path="/orders/:id"
            element={<System contentOrders={<Order />} />}
          />
      </Route>

      <Route element={<Required allowedRoles={[roles.admin, roles.agentCustomer]} />}>
          <Route
            path="/customers"
            element={<System contentCustomers={<Customers />} />}
          />
      </Route>

      
      <Route element={<Required allowedRoles={[roles.admin, roles.stockManager]} />}>   
          <Route
            path="/products"
            element={<System contentProducts={<Products />} />}
          />       
          <Route
            path="/product/:id"
            element={<System contentProducts={<Product />} />}
          />       
          <Route
            path="/categories"
            element={<System contentCategories={<Categories />} />}
          />       
      </Route>

        {/* <System /> */}

        {/* For Client when Auth */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
