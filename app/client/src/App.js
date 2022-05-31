import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import AdminPanel from "./views/auth/AdminPanel";
import Dashboard from "./views/grow_yb/Dashboard";
import Index from "./views/user/Index";
import Layout from "./components/Layout";

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
                  
                  {/* Protect this Routes for super Admin */}
                  <Route path="/super-dashboard" element={<Dashboard />} />

                  {/* For Admin when Auth */}
                  <Route path="/dashboard" element={<Index />} />

                  {/* For Client when Auth */}
              </Route>
          </Routes>
      </div>
    );
}

export default App;


  