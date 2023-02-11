import React, { createContext, useState } from 'react';
import api from '@/lib/api';
import { IAppUser } from '@/User';
import { LoginResponse, SignInFormValues } from '@/User/SignIn';

interface IAuthContext {
    user: IAppUser;
    setUser: (user: IAppUser) => void;
    isAuthenticated: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
    handleLogin: (formData: SignInFormValues) => void;
    handleLogout: () => void;
}

const initialUser: IAppUser = {
    id: '',
    username: '',
    role: '',
    workouts: [],
    token: '',
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<IAppUser>(initialUser);

    const handleLogin = async (formData: SignInFormValues) => {
        const response = await api.post<LoginResponse>(
            'http://localhost:7000/api/users/login',
            JSON.stringify(formData),
        );
        const { user, token } = response.data;

        if (user && token) {
            localStorage.setItem('token', token);
            setUser({
                id: user.id,
                username: user.username,
                role: user.role,
                workouts: user.workouts || [],
                token: token,
            });
            setAuthenticated(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(initialUser);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                handleLogin,
                handleLogout,
                user,
                setUser,
                isAuthenticated,
                setAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
