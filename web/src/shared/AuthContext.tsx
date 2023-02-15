import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAppUser } from '../types';
import { SignInFormValues } from '../User/SignIn/SignInForm';
import { usePost } from './hooks/usePost';

const baseUrl = process.env.REACT_APP_DB_URL as string;

export interface IAuthContext {
    isLoggedIn: boolean;
    user: IAppUser | null;
    loading: boolean;
    login: ({}: SignInFormValues) => Promise<void>;
    logout: () => void;
}

interface LoginResponse {
    userObject: {
        id: string;
        username: string;
        role: string;
    };
    token: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IAppUser | null>({
        id: '',
        username: '',
        role: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [post, response] = usePost<LoginResponse>(`${baseUrl}/users/login`);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = localStorage.getItem('@superset:user');
            const storageToken = localStorage.getItem('@superset:token');

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    const login = async ({ username, password }: SignInFormValues) => {
        try {
            await post({ body: { username, password } });
            if (response.data?.userObject) {
                setUser(response.data.userObject);
                localStorage.setItem('@superset:user', JSON.stringify(response.data.userObject));
            }
            if (response.data?.token) {
                localStorage.setItem('@superset:token', response.data.token);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};