import { createContext } from 'react';
import { IAppUser } from '../types';

interface IAuthContext {
    appUser: IAppUser | null;
    token: string | null;
    setAppUser: (appUser: IAppUser | null) => void;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
    appUser: null,
    token: null,
    setAppUser: () => {},
    setToken: () => {},
});
