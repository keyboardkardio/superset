import { Heading, Stack, Text } from '@chakra-ui/react';
import { Card } from '../../shared/components/Card';
import { useFetch } from '../../shared/hooks/useFetch';

const baseUrl = process.env.REACT_APP_DB_URL as string;

export interface WorkoutItemResponse {
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
    workoutItems: WorkoutItemResponse[];
}

export function Dashboard() {
    const { data, error } = useFetch<WorkoutResponse>(`${baseUrl}/workouts/latest`);

    return (
        <Stack>
            <Heading color={'green.500'}>Last Workout</Heading>
            <Card key={data?.id}>
                <Stack>
                    {data?.workoutItems.map((workoutItem: WorkoutItemResponse) => (
                        <div key={workoutItem.id}>
                            <Heading
                                color={'whiteAlpha.900'}
                                size={'sm'}
                                textTransform={'capitalize'}
                                borderBottom={'1px'}
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
                    <Text>{error && error?.message}</Text>
                </Stack>
            </Card>
        </Stack>
    );
}
