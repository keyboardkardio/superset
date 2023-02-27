import { Stack, Typography } from '@mui/material';
import { AppBar } from '../../components/AppBar';
import { useFetch } from '../../hooks/useFetch';

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
    const { data, error } = useFetch<WorkoutResponse[]>('workouts');

    return (
        <>
            <Stack spacing={2}>
                <Typography variant={'h1'}>Workouts</Typography>
                <Stack spacing={2}>
                    {data?.map((workout: WorkoutResponse) => (
                        <Stack key={workout.id} spacing={2}>
                            <Typography variant={'h2'} borderBottom={'1px solid #FFFFFC'}>
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
                                        <Typography key={set.id} paddingLeft={'2rem'}>
                                            {set.reps} reps x {set.weight} lbs
                                        </Typography>
                                    ))}
                                </div>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Stack>
            <AppBar />
        </>
    );
}
