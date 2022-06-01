import { Outlet, Navigate, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    
    return (
        localStorage.getItem("auth") ? <Navigate to="/super-dashboard" replace /> :
        <main>
            <Outlet />
        </main> 
    );
}

export default Layout;