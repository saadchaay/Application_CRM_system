import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace /> 
    );
}

export default RequiredAuth;
