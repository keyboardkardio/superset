import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './root';
import { AuthProvider } from './shared/AuthContext';
import { RequireAuth } from './shared/components/RequireAuth';
import { Dashboard } from './User/Dashboard';
import { SignIn } from './User/SignIn';
import { SignUp } from './User/SignUp';
import { WorkoutCreate } from './Workout/WorkoutCreate';
import { WorkoutLog } from './Workout/WorkoutLog';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
            {
                path: '/dashboard',
                element: (
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                ),
            },
            {
                path: '/workouts',
                element: (
                    <RequireAuth>
                        <WorkoutLog />
                    </RequireAuth>
                ),
            },
            {
                path: '/workouts/log',
                element: (
                    <RequireAuth>
                        <WorkoutLog />
                    </RequireAuth>
                ),
            },
            {
                path: '/workouts/new',
                element: (
                    <RequireAuth>
                        <WorkoutCreate />
                    </RequireAuth>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
);
