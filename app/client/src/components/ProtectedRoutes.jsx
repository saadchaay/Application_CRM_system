import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Login from '../views/auth/Login';

const ProtectedRoutes = () => {
    const [isAuth, setAuth] = useState(false);

    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;