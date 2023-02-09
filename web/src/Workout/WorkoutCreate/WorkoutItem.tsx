import { useEffect, useState } from 'react';
import { Control, useFieldArray, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, Select, Stack } from '@chakra-ui/react';
import { Exercise } from '@/Exercise';
import api from '@/lib/api';
import { WorkoutSet } from './WorkoutSet';
import { FormValues } from '.';

export default function WorkoutItem({ control, register }: {
    control: Control<FormValues>;
    register: UseFormRegister<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    getValues: UseFormGetValues<FormValues>;
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'workoutItems',
    });
    
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    
    useEffect(() => {
        const fetchExerciseList = async () => {
            try {
                const { data: exercises } = await api.get<Exercise[]>('/exercises');
                setExerciseList(exercises);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExerciseList();
    }, []);

    return (
        <>
            {fields.map((item, index) => (
                <Card
                    key={item.id}
                    p={4}
                    backdropFilter={'auto'}
                    backdropBlur={'md'}
                    bgColor={'rgba(255, 255, 255, 0.1)'}
                    variant={'outline'}
                >
                    <Stack spacing={4}>
                        <Stack direction={'row'}>
                            <Select
                                size={'lg'}
                                color={'gray.400'}
                                variant={'unstyled'}
                                {...register(`workoutItems.${index}.exerciseId` as const)}
                            >
                                {exerciseList.map((exercise: Exercise) => (
                                    <option key={exercise.id} value={exercise.id}>
                                        {exercise.name}
                                    </option>
                                ))}
                            </Select>
                            <Button bg={'none'} onClick={() => remove(index)}>
                                <DeleteIcon color={'red.600'} boxSize={8} />
                            </Button>
                        </Stack>
                        <WorkoutSet nestIndex={index} {...{ control, register }} />
                    </Stack>
                </Card>
            ))}
            <Button
                type={'button'}
                size={'lg'}
                variant={'outline'}
                backdropFilter={'auto'}
                backdropBlur={'md'}
                bgColor={'rgba(255, 255, 255, 0.1)'}
                color={'green.500'}
                onClick={() => {
                    append({ exerciseId: 0, sets: [{ reps: 0, weight: 0 }] });
                }}
            >
                Add Exercise
            </Button>
        </>
    );
}
