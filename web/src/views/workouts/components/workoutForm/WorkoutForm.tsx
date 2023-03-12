import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { usePost } from '../../../../hooks/usePost';
import { WorkoutItemForm } from './WorkoutItemForm';

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

export interface WorkoutFormValues {
    workoutItems: {
        exerciseId: number;
        sets: { reps: number; weight: number }[];
    }[];
}

const defaultValues: WorkoutFormValues = {
    workoutItems: [{
        exerciseId: 1,
        sets: [{ reps: 0, weight: 0 }],
    }],
};

export function WorkoutForm() {
    const { control, getValues, handleSubmit, register, reset, setValue, formState: { errors } } = useForm({
        defaultValues,
    });
    
    const navigate = useNavigate();
    const [post, response] = usePost(`${baseUrl}/workouts`);
    const onSubmit = async (data: WorkoutFormValues) => {
        try {
            await post({ body: data });
            reset();
            if (response.status == 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack spacing={4}>
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
                <Stack spacing={8}>
                    <WorkoutItemForm
                        {...{ control, register, defaultValues, getValues, setValue, errors }}
                    />
                    <Button type={'submit'} variant={'contained'} size={'large'}>
                        Finish Session
                    </Button>
                </Stack>
            </form>
            <Button
                type={'button'}
                variant={'contained'}
                size={'large'}
                onClick={() => reset(defaultValues)}
            >
                Reset Log
            </Button>
        </Stack>
    );
}
