import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    const is_super = localStorage.getItem("is_super");
    return (
        isLoggedIn ?
            is_super ? 
                <Outlet /> :
                <Navigate to="/dashboard" state={{ from: location }} replace /> 
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
