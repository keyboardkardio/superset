import { Control, Controller, useFieldArray, UseFormRegister } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';

import { useFetch } from '../../../../hooks/useFetch';
import { IExercise } from '../../../../types';
import { WorkoutFormValues } from './WorkoutForm';
import { WorkoutSetForm } from './WorkoutSetForm';

interface IProps {
    control: Control<WorkoutFormValues>;
    register: UseFormRegister<WorkoutFormValues>;
}

export function WorkoutItemForm({ control, register }: IProps) {
    const { fields, append, remove } = useFieldArray({ control, name: 'workoutItems' });
    const { data, error } = useFetch<IExercise[]>('exercises');

    return (
        <>
            {fields.map((item, index) => (
                <Paper key={item.id}>
                    <Stack spacing={2} padding={'1rem'}>
                        <Stack direction={'row'}>
                            <Controller
                                name={`workoutItems.${index}.exerciseId`}
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth id='exercise'>
                                        <InputLabel id='exercise'>Exercise</InputLabel>
                                        <Select
                                            labelId='exercise'
                                            label='Exercise'
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            {data?.map((exercise: IExercise) => (
                                                <MenuItem key={exercise.id} value={exercise.id}>
                                                    <Typography textTransform={'capitalize'}>{exercise.name}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Button type={'button'} onClick={() => remove(index)}>
                                <DeleteIcon fontSize={'large'} color={'error'} />
                            </Button>
                        </Stack>
                        <WorkoutSetForm nestIndex={index} {...{ control, register }} />
                    </Stack>
                </Paper>
            ))}
            <Button
                type={'button'}
                variant={'contained'}
                size={'large'}
                color={'info'}
                onClick={() => {
                    append({ exerciseId: 0, sets: [{ reps: 0, weight: 0 }] });
                }}
            >
                Add Exercise
            </Button>
        </>
    );
}
