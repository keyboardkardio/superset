import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        return <Navigate state={{ from: location }} to='/sign_in' />;
    }
}
