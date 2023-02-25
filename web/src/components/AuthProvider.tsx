import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { IAppUser } from '../types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [appUser, setAppUser] = React.useState<IAppUser | null>(null);
    const [token, setToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('@superset:appUser');
        const storedToken = localStorage.getItem('@superset:token');
        if (storedUser && storedToken) {
            setAppUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ appUser, token, setAppUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}
