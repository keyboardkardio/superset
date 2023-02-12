import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/shared/context/AuthContext';
import Layout from './Layout';
import Home from './Home';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import RequireAuth from './Auth/RequireAuth';
import Dashboard from './User/Dashboard';
import WorkoutCreate from './Workout/WorkoutCreate';

export default function App() {

    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/sign_in' element={<SignIn />} />
                    <Route path='/sign_up' element={<SignUp />} />
                    <Route
                        path='/dashboard'
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/create_workout'
                        element={
                            <RequireAuth>
                                <WorkoutCreate />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
