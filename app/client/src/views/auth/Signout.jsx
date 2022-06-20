import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  return <Navigate to="/" />
};

export default Logout;
