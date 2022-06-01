import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("is_super");
    return <Navigate to="/admin/login" />;
};

export default Logout;