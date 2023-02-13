import { useEffect, useState } from 'react';
import { Card, Heading, Stack, Text } from '@chakra-ui/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface WorkoutItem {
    id: string;
    exercise: {
        name: string;
    };
    sets: {
        id: string;
        reps: number;
        weight: number;
    }[];
}

export default function Dashboard() {
    const [workout, setWorkout] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseUrl}/workouts`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setWorkout(data);
        };
        fetchData();
    }, []);

    return (
        <Stack>
            <Heading color={'green.500'}>Last Workout</Heading>
            {workout?.map((workout: any) => (
                <Card
                    key={workout.id}
                    padding={'1rem'}
                    variant={'outline'}
                    backdropFilter={'auto'}
                    backdropBlur={'sm'}
                    backgroundColor={'rgba(255, 255, 255, 0.1)'}
                >
                    <Stack>
                        {workout.workoutItems.map((workoutItem: WorkoutItem) => (
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
                    </Stack>
                </Card>
            ))}
        </Stack>
    );
}
