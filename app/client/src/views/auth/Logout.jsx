import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.clear();
    // localStorage.removeItem("auth");
    // localStorage.removeItem("is_super");
    return <Navigate to="/login" />;
};

export default Logout;