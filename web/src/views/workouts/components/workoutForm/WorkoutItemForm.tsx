import { Control, Controller, useFieldArray, UseFormRegister } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useFetch } from '../../../../hooks/useFetch';
import { IExercise } from '../../../../types';
import { WorkoutFormValues } from './WorkoutForm';
import { WorkoutSetForm } from './WorkoutSetForm';

const baseUrl = process.env.REACT_APP_DB_URL as string;

interface IProps {
    control: Control<WorkoutFormValues>;
    register: UseFormRegister<WorkoutFormValues>;
}

export function WorkoutItemForm({ control, register }: IProps) {
    const { fields, append, remove } = useFieldArray({ control, name: 'workoutItems' });
    const { data, error } = useFetch<IExercise[]>(`${baseUrl}/exercises`);

    return (
        <>
            {fields.map((item, index) => (
                <Stack key={item.id}>
                    <Stack spacing={2}>
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
                                                    {exercise.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Button onClick={() => remove(index)}>
                                <DeleteIcon />
                            </Button>
                        </Stack>
                        <WorkoutSetForm nestIndex={index} {...{ control, register }} />
                    </Stack>
                </Stack>
            ))}
            <Button
                type={'button'}
                variant={'contained'}
                size={'large'}
                onClick={() => {
                    append({ exerciseId: 0, sets: [{ reps: 0, weight: 0 }] });
                }}
            >
                Add Exercise
            </Button>
        </>
    );
}
