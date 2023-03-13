import { LinearProgress, Stack, Typography } from '@mui/material';

import { AppBar } from '../../components/AppBar';
import { Logo } from '../../components/Logo';
import { Title } from '../../components/Title';
import { useFetch } from '../../hooks/useFetch';
import { WorkoutItemResponse, WorkoutResponse } from '../workouts/Workouts';

export function Dashboard() {
    const { data, isLoading, error } = useFetch<WorkoutResponse[]>('workouts');
    const lastWorkout = data?.[data?.length - 1];

    return (
        <>
            <Logo />
            <Stack spacing={2}>
                <Title>Last Workout</Title>
                {isLoading ? (
                    <LinearProgress color={'primary'} />
                ) : (
                    <Stack border={'1px solid #1cdc82'} borderRadius={'0.5rem'} padding={'1rem'}>
                        {lastWorkout ? (
                            <>
                                <Typography
                                    fontSize={'1.2rem'}
                                    textAlign={'center'}
                                    borderBottom={'1px solid'}
                                >
                                    {new Date(lastWorkout?.date as string).toLocaleString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Typography>
                                {lastWorkout?.workoutItems.map(
                                    (workoutItem: WorkoutItemResponse) => (
                                        <Stack key={workoutItem.id} marginTop={'1rem'}>
                                            <Typography
                                                variant={'h5'}
                                                color={'primary'}
                                                textTransform={'capitalize'}
                                            >
                                                {workoutItem.exercise.name}
                                            </Typography>
                                            {workoutItem.sets.map((set, index) => (
                                                <Typography key={set.id} paddingLeft={'1rem'}>
                                                    Set {index + 1} &rarr; {set.reps} reps x{' '}
                                                    {set.weight} lbs
                                                </Typography>
                                            ))}
                                        </Stack>
                                    ),
                                )}
                            </>
                        ) : (
                            <Typography align={'center'}>There are no workouts to display.</Typography>
                        )}
                    </Stack>
                )}
            </Stack>
            <AppBar />
        </>
    );
}
