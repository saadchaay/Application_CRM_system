import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const auth = JSON.parse(localStorage.getItem("auth"));
    const is_super = localStorage.getItem("is_super");
    return (
            ((allowedRoles.includes(auth.role))) ?
                <Outlet /> : auth ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                   : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
