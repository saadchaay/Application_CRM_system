import { Outlet, Navigate } from "react-router-dom";

const Layout = () => {
    
    return (
        localStorage.getItem("is_super") ? <Navigate to="/super-dashboard" replace /> :
        <main>
            <Outlet />
        </main> 
    );
}

export default Layout;