import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';

import { usePost } from '../../../../hooks/usePost';
import { WorkoutItemForm } from './WorkoutItemForm';
import { AppBar } from '../../../../components/AppBar';
import { LoadingButton } from '@mui/lab';

export interface WorkoutFormValues {
    workoutItems: {
        exerciseId: number;
        sets: { reps: number; weight: number }[];
    }[];
}

const defaultValues: WorkoutFormValues = {
    workoutItems: [{
        exerciseId: 0,
        sets: [{ reps: 0, weight: 0 }]},
    ],
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
            navigate('/workouts');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Stack spacing={4} paddingBottom={'2rem'}>
                <Stack alignItems={'flex-end'} paddingRight={'1rem'}>
                    <Typography variant={'h3'}>
                        {new Date().toLocaleString('en-US', { weekday: 'long' })}
                    </Typography>
                    <Typography variant={'h4'}>
                        {new Date().toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </Typography>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <WorkoutItemForm
                            {...{ control, register, defaultValues, getValues, setValue, errors }}
                        />
                        <Stack direction={'row'} spacing={2}>
                            <Button
                                onClick={() => reset(defaultValues)}
                                variant={'contained'}
                                color={'warning'}
                                type={'button'}
                                size={'large'}
                                fullWidth
                            >
                                Reset Log
                            </Button>
                            <LoadingButton
                                loading={response.isLoading}
                                variant={'contained'}
                                color={'primary'}
                                type={'submit'}
                                size={'large'}
                                fullWidth
                            >
                                Finish Session
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
            <AppBar />
        </>
    );
}
