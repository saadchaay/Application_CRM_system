import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import User from "./pages/users/User";
// import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Customer from "./pages/customers/Customer";
import ProductList from "./pages/products/ProductList";
import NewProduct from "./pages/products/NewProduct";
import Product from "./pages/products/Product";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-edit/:customerId" element={<Customer />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/new-product" element={<NewProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
