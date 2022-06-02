import { Navigate } from "react-router-dom";
import { useState } from "react";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/admin/login" />
};

export default Logout;
