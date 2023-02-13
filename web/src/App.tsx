import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Dashboard from './User/Dashboard';
import WorkoutCreate from './Workout/WorkoutCreate';
import WorkoutLog from './Workout/WorkoutLog';
import RequireAuth from './Auth/RequireAuth';
import { AuthProvider } from './shared/context/AuthContext';

export default function App() {
    return (
        <Routes>
            <AuthProvider>
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
                        path='/workout_log'
                        element={
                            <RequireAuth>
                                <WorkoutLog />
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
            </AuthProvider>
        </Routes>
    );
}
