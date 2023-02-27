import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { usePost } from '../../../../hooks/usePost';
import { WorkoutItemForm } from './WorkoutItemForm';

export interface WorkoutFormValues {
    workoutItems: {
        exerciseId: number;
        sets: { reps: number; weight: number }[];
    }[];
}

const defaultValues: WorkoutFormValues = {
    workoutItems: [{
        exerciseId: 0,
        sets: [{ reps: 0, weight: 0 }],
    }],
};

export function WorkoutForm() {
    const { control, getValues, handleSubmit, register, reset, setValue, formState: { errors } } = useForm({
        defaultValues,
    });

    const navigate = useNavigate();
    const [post, response] = usePost('workouts');
    const onSubmit = async (data: WorkoutFormValues) => {
        try {
            await post({ body: data });
            if (response.status == 200) {
                reset();
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack spacing={4} paddingBottom={'2rem'}>
            <Stack alignItems={'flex-end'} paddingRight={'1rem'}>
                <Typography variant={'h1'}>
                    {new Date().toLocaleString('en-US', { weekday: 'long' })}
                </Typography>
                <Typography variant={'h2'}>
                    {new Date().toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <WorkoutItemForm {...{ control, register, defaultValues, getValues, setValue, errors }} />
                    <Stack direction={'row'} spacing={2}>
                        <Button
                            fullWidth
                            type={'button'}
                            variant={'contained'}
                            size={'large'}
                            color={'error'}
                            onClick={() => reset(defaultValues)}
                        >
                            Reset Log
                        </Button>
                        <Button
                            fullWidth
                            type={'submit'}
                            variant={'contained'}
                            size={'large'}
                            color={'success'}
                        >
                            Finish Session
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
}
