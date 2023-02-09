import { createBrowserRouter } from 'react-router-dom';
import Home from '@/Home';
import Dashboard from '@/User/Dashboard';
import SignIn from '@/User/SignIn';
import SignUp from '@/User/SignUp';
import WorkoutCreate from '@/Workout/WorkoutCreate';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/sign_in',
        element: <SignIn />,
    },
    {
        path: '/sign_up',
        element: <SignUp />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/create_workout',
        element: <WorkoutCreate />,
    },
]);
