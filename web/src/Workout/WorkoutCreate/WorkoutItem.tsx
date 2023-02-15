import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Select, Stack } from '@chakra-ui/react';
import { FormValues } from '.';
import { IExercise } from '../../Exercise';
import { Card } from '../../shared/components/Card';
import { useFetch } from '../../shared/hooks/useFetch';
import { WorkoutSet } from './WorkoutSet';

const baseUrl = process.env.REACT_APP_DB_URL as string;

interface IProps {
    control: Control<FormValues>;
    register: UseFormRegister<FormValues>;
}

export function WorkoutItem({ control, register }: IProps) {
    const { fields, append, remove } = useFieldArray({ control, name: 'workoutItems' });
    const { data, error } = useFetch<IExercise[]>(`${baseUrl}/exercises`);

    return (
        <>
            {fields.map((item, index) => (
                <Card key={item.id}>
                    <Stack spacing={4}>
                        <Stack direction={'row'}>
                            <Select
                                size={'lg'}
                                color={'gray.400'}
                                variant={'outline'}
                                {...register(`workoutItems.${index}.exerciseId` as const)}
                            >
                                {data?.map((exercise: IExercise) => (
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
