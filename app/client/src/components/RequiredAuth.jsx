import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        localStorage.getItem("auth") ?
            <Outlet /> :
            <Navigate to="/admin/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
