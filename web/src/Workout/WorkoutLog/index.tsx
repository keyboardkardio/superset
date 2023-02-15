import { Card, Heading, Stack, Text } from '@chakra-ui/react';
import { useFetch } from '../../shared/hooks/useFetch';

const baseUrl = process.env.REACT_APP_DB_URL as string;

interface WorkoutItem {
    id: string;
    exercise: { name: string };
    sets: {
        id: string;
        reps: number;
        weight: number;
    }[];
}

export interface WorkoutResponse {
    id: string;
    date: Date | string;
    workoutItems: WorkoutItem[];
}

export function WorkoutLog() {
    const { data, error } = useFetch<WorkoutResponse[]>(`${baseUrl}/workouts/log`);

    return (
        <Stack>
            <Heading color={'green.500'}>Workout Log</Heading>
            {data?.map((workout: any) => (
                <Card key={workout.id}>
                    <Stack>
                        {workout.workoutItems.map((workoutItem: WorkoutItem) => (
                            <div key={workoutItem.id}>
                                <Heading
                                    size={'sm'}
                                    borderBottom={'1px'}
                                    color={'whiteAlpha.900'}
                                    textTransform={'capitalize'}
                                >
                                    {workoutItem.exercise.name}
                                </Heading>
                                {workoutItem.sets.map((set) => (
                                    <Text key={set.id} color={'whiteAlpha.900'}>
                                        {set.reps} reps x {set.weight} lbs
                                    </Text>
                                ))}
                            </div>
                        ))}
                    </Stack>
                </Card>
            ))}
        </Stack>
    );
}
