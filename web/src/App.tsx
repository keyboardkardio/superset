import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Dashboard from './User/Dashboard';
import WorkoutCreate from './Workout/WorkoutCreate';
import WorkoutLog from './Workout/WorkoutLog';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/sign_in' element={<SignIn />} />
                <Route path='/sign_up' element={<SignUp />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/workout_log' element={<WorkoutLog />} />
                <Route path='/create_workout' element={<WorkoutCreate />} />
            </Route>
        </Routes>
    );
}
