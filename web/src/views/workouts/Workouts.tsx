import { Stack, Typography } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';

const baseUrl = process.env.REACT_APP_DB_URL as string;

export interface WorkoutItemResponse {
    id: string;
    workoutId: string;
    exercise: { name: string };
    sets: {
        id: string;
        workoutItemId: string;
        reps: number;
        weight: number;
    }[];
}

export interface WorkoutResponse {
    id: string;
    date: string;
    user: { username: string };
    workoutItems: WorkoutItemResponse[];
}

export function Workouts() {
    const { data, error } = useFetch<WorkoutResponse[]>(`${baseUrl}/workouts`);

    return (
        <>
            <Typography variant={'h1'}>Workouts</Typography>
            <Stack spacing={4} marginTop={'2rem'}>
                {Array.isArray(data) &&
                    data?.map((workout: WorkoutResponse) => (
                        <Stack key={workout.id} spacing={2}>
                            <Typography variant={'h2'} borderBottom={'1px solid black'}>
                                {new Date(workout.date).toLocaleString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </Typography>
                            {workout.workoutItems.map((workoutItem: WorkoutItemResponse) => (
                                <div key={workoutItem.id}>
                                    <Typography variant={'h3'} textTransform={'capitalize'}>
                                        {workoutItem.exercise.name}
                                    </Typography>
                                    {workoutItem.sets.map((set) => (
                                        <Typography key={set.id}>
                                            {set.reps} reps x {set.weight} lbs
                                        </Typography>
                                    ))}
                                </div>
                            ))}
                        </Stack>
                    ))}
            </Stack>
        </>
    );
}
