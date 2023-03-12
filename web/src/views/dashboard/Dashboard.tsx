import { Typography } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { WorkoutResponse } from '../workouts/Workouts';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function Dashboard() {
    const { data, error } = useFetch<WorkoutResponse[]>(`${baseUrl}/workouts/latest`);

    return (
        <>
            <Typography variant={'h1'}>Welcome</Typography>
            
        </>
    );
}
