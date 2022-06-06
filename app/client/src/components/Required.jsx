import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const auth = JSON.parse(localStorage.getItem("auth"));
    const time = localStorage.getItem("time");
    const time_now = new Date().getTime();
    const time_diff = time_now - time;
    return (
            time_diff < 3600000 ? (
                ((allowedRoles.includes(auth.role))) ?
                <Outlet /> : auth ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                   : <Navigate to="/login" state={{ from: location }} replace />
            ) : <Navigate to="/logout" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
