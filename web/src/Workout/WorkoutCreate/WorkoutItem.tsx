import { useEffect, useState } from 'react';
import { Control, useFieldArray, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import api from '@/lib/api';
import { Exercise } from '@/Exercise';
import { WorkoutSet } from './WorkoutSet';
import { FormValues } from '.';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, Select, Stack } from '@chakra-ui/react';

interface IProps {
    control: Control<FormValues>;
    register: UseFormRegister<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    getValues: UseFormGetValues<FormValues>;
}

export default function WorkoutItem({ control, register, setValue, getValues }: IProps) {
    const { fields, append, remove } = useFieldArray({ control, name: 'workoutItems' });
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

    useEffect(() => {
        const fetchExerciseList = async () => {
            try {
                const { data: exercises } = await api.get<Exercise[]>('/exercises', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
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
                <Card key={item.id} p={4} backdropFilter={'auto'} backdropBlur={'md'} bgColor={'rgba(255, 255, 255, 0.1)'} variant={'outline'}>
                    <Stack spacing={4}>
                        <Stack direction={'row'}>
                            <Select size={'lg'} color={'gray.400'} variant={'outline'} {...register(`workoutItems.${index}.exerciseId` as const)}>
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
                color={'green.500'}
                backdropBlur={'md'}
                backdropFilter={'auto'}
                bgColor={'rgba(255, 255, 255, 0.1)'}
                onClick={() => {
                    append({ exerciseId: 0, sets: [{ reps: 0, weight: 0 }] });
                }}
            >
                Add Exercise
            </Button>
        </>
    );
}
