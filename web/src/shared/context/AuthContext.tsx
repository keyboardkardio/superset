import React, { createContext, useState } from 'react';

interface IAuthContext {
    isAuthenticated: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    /*
     * The `!!` operator is used to convert the value stored in local storage 
     * into a boolean. Evaluates to 'true' if the token exists in local storage. */
    const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
