import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const auth = JSON.parse(localStorage.getItem("auth"));
    const is_super = localStorage.getItem("is_super");
    return (
        // (auth.role.find(role => allowedRoles.includes(role)) && !is_super)  ? 
        //     <Outlet /> : <Navigate to="/login" state={{ from: location }} replace /> 
        // (allowedRoles.find(auth.role => auth.role === ) && !is_super) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace /> 
        ((allowedRoles.includes(auth.role))) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
