import { Stack, Typography } from '@mui/material';
import { AppBar } from '../../components/AppBar';
import { useFetch } from '../../hooks/useFetch';
import { WorkoutItemResponse, WorkoutResponse } from '../workouts/Workouts';

export function Dashboard() {
    const { data, error } = useFetch<WorkoutResponse[]>('workouts');
    const lastWorkout = data?.[data?.length - 1];

    return (
        <>
            <Stack spacing={2}>
                <Typography variant={'h1'}>Last Workout</Typography>
                <Stack border={'1px solid #FF871F'} borderRadius={'0.5rem'} padding={'1rem'}>
                    <Typography variant={'h2'} textAlign={'center'} marginBottom={'1rem'}>
                        {new Date(lastWorkout?.date as string).toLocaleString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </Typography>
                    {lastWorkout?.workoutItems.map((workoutItem: WorkoutItemResponse) => (
                        <div key={workoutItem.id}>
                            <Typography variant={'h3'} textTransform={'capitalize'}>
                                {workoutItem.exercise.name}
                            </Typography>
                            {workoutItem.sets.map((set, index) => (
                                <Typography key={set.id}>
                                    Set {index + 1} &nbsp; {set.reps} reps x {set.weight} lbs
                                </Typography>
                            ))}
                        </div>
                    ))}
                </Stack>
            </Stack>
            <AppBar />
        </>
    );
}
