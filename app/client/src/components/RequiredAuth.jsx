import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("auth");
    const is_super = localStorage.getItem("is_super");
    const time = localStorage.getItem("time");
    const time_now = new Date().getTime();
    const time_diff = time_now - time;
    return (
        time_diff < 3600000 ? (
            isLoggedIn ?
                is_super ? 
                <Outlet /> :
                <Navigate to="/dashboard" state={{ from: location }} replace /> 
                : <Navigate to="/login" state={{ from: location }} replace />
        ) : <Navigate to="/sign-out" state={{ from: location }} replace />
        
    );
}

export default RequiredAuth;
