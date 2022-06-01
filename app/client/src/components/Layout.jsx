import { Outlet, Navigate } from "react-router-dom";

const Layout = () => {
    
    return (
        localStorage.getItem("auth") ? <Navigate to="/super-dashboard" replace /> :
        <main>
            <Outlet />
        </main> 
    );
}

export default Layout;