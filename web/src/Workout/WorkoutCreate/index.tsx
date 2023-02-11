import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Heading, Stack } from '@chakra-ui/react';
import * as D from '@/utils/date';
import api from '@/lib/api';
import WorkoutItem from './WorkoutItem';

export interface FormValues {
    userId?: string;
    workoutItems: {
        exerciseId: number;
        sets: { reps: number; weight: number }[];
    }[];
}

const defaultValues: FormValues = {
    workoutItems: [{
        exerciseId: 0,
        sets: [{ reps: 0, weight: 0 }],
    }],
};

export default function WorkoutCreate() {
    const navigate = useNavigate();
    const {
        control,
        getValues,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await api.post('/workouts', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Stack mb={8}>
                <Heading size={'2xl'} textAlign={'right'} color={'green.500'}>
                    {D.dayOfWeek}
                </Heading>
                <Heading size={'xl'} textAlign={'right'} color={'green.500'}>
                    {D.date}
                </Heading>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={8}>
                    <WorkoutItem {...{ control, register, defaultValues, getValues, setValue, errors }} />
                    <Button type={'submit'} size={'lg'} bgColor={'green.500'}>
                        Finish Session
                    </Button>
                </Stack>
            </form>
            <Button
                type={'button'}
                variant={'outline'}
                size={'lg'}
                backdropFilter={'auto'}
                backdropBlur={'md'}
                bgColor={'rgba(255, 255, 255, 0.1)'}
                color={'orange.400'}
                onClick={() => reset(defaultValues)}
            >
                Reset Log
            </Button>
        </>
    );
}
