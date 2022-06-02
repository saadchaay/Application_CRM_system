import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" state={{ from: location }} replace /> 
    );
}

export default RequiredAuth;
