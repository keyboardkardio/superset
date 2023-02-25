import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack, TextField } from '@mui/material';
import { WorkoutFormValues } from './WorkoutForm';

interface IProps {
    nestIndex: number;
    control: Control<WorkoutFormValues>;
    register: UseFormRegister<WorkoutFormValues>;
}

export function WorkoutSetForm({ nestIndex, control, register }: IProps) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `workoutItems.${nestIndex}.sets` as const,
    });

    return (
        <Stack spacing={2}>
            {fields.map((item, k) => (
                <Stack key={item.id} direction={'row'}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            type={'number'}
                            label={'Reps'}
                            {...register(`workoutItems.${nestIndex}.sets.${k}.reps` as const)}
                        />
                        <TextField
                            type={'number'}
                            label={'Weight'}
                            {...register(`workoutItems.${nestIndex}.sets.${k}.weight` as const)}
                        />
                    </Stack>
                    <Button type={'button'} onClick={() => remove(k)}>
                        <DeleteIcon />
                    </Button>
                </Stack>
            ))}
            <Button
                type={'button'}
                variant={'contained'}
                size={'large'}
                onClick={() => append({ reps: 0, weight: 0 })}
            >
                Add Set
            </Button>
        </Stack>
    );
}
