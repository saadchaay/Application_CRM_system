import { Navigate } from "react-router-dom";

const Logout = () => {
    const isSuper = localStorage.getItem("is_super");
    localStorage.clear();
    return isSuper ? <Navigate to="/admin/login" /> : <Navigate to="/login" /> ;
};

export default Logout;