import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AppContainer } from './components/AppContainer';
import { AuthProvider } from './components/AuthProvider';
import { RequireAuth } from './components/RequireAuth';
import { Login } from './views/auth/Login';
import { Register } from './views/auth/Register';
import { Dashboard } from './views/dashboard/Dashboard';
import { AddWorkout } from './views/workouts/AddWorkout';
import { Workouts } from './views/workouts/Workouts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#888C81',
        },
        secondary: {
            main: '#D9C9BA',
        },
        text: {
            primary: '#1a1a1a',
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '1.4rem',
        },
        h3: {
            fontSize: '1rem',
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Dashboard />
            </RequireAuth>
        ),
    },
    {
        path: '/signin',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Register />,
    },
    {
        path: '/workouts',
        element: (
            <RequireAuth>
                <Workouts />
            </RequireAuth>
        ),
    },
    {
        path: '/workouts/add',
        element: (
            <RequireAuth>
                <AddWorkout />
            </RequireAuth>
        ),
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppContainer>
                    <RouterProvider router={router} />
                </AppContainer>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
);
