import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("auth");
    return <Navigate to="/admin/login" />;
};

export default Logout;