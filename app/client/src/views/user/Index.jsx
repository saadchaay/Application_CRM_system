import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Dashboard from "../../pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "../../pages/users/Users";
import User from "../../pages/users/User";
import Customers from "../../pages/customers/Customers";
import Customer from "../../pages/customers/Customer";
import ProductList from "../../pages/products/ProductList";
import NewProduct from "../../pages/products/NewProduct";
import Product from "../../pages/products/Product";
import Categories from "../../pages/categories/Categories";
import "./index.css"



function Index() {
  return (
    <BrowserRouter>
      <div className="Index">
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-edit/:customerId" element={<Customer />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Index;
