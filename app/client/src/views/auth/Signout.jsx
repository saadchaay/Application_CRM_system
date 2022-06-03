import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/admin/login" />
};

export default Logout;
