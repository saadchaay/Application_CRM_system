import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    const is_super = localStorage.getItem("is_super");
    return (
        isLoggedIn ?
            is_super ? 
                <Outlet /> :
                <Navigate to="/login" state={{ from: location }} replace /> 
                : <Navigate to="/admin/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
