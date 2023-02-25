import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { Login } from '../views/auth/Login';

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { appUser, token } = React.useContext(AuthContext);
    if (!appUser || !token) {
        return <Login />;
    }

    return <>{children}</>;
}
