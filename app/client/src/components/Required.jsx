import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    const is_super = localStorage.getItem("is_super");
    const isAdmin = JSON.parse(localStorage.getItem("auth")).role === "admin";
    return (
        (isLoggedIn && !is_super && isAdmin) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace /> 
    );
}

export default RequiredAuth;
