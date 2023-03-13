import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Link, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { usePost } from '../../hooks/usePost';
import { Logo } from '../../components/Logo';
import { Title } from '../../components/Title';
import { useEffect } from 'react';

export const registrationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required to proceed.')
        .min(4, 'Username must be at least 4 characters.')
        .max(64, 'Username cannot exceed 64 characters.'),
    password: yup
        .string()
        .required('Password is required to proceed.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(80, 'Password cannot exceed 80 characters.'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match.'),
});

export interface RegistrationFormValues extends yup.InferType<typeof registrationSchema> {}

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: yupResolver(registrationSchema),
    });

    const navigate = useNavigate();
    const [post, response] = usePost('users/register');
    const onSubmit = async (credentials: RegistrationFormValues) => {
        try {
            await post({ body: credentials });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (response.status === 201) {
            navigate('/signin');
        }
    }, [response.data]);

    return (
        <>
            <Logo />
            <Stack spacing={4}>
                <Title>Sign Up</Title>
                <Stack component={'form'} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        error={errors.username ? true : false}
                        helperText={errors.username?.message}
                        {...register('username')}
                        variant={'outlined'}
                        label={'Username'}
                        type={'text'}
                    />
                    <TextField
                        helperText={errors.password?.message}
                        error={errors.password ? true : false}
                        {...register('password')}
                        variant={'outlined'}
                        label={'Password'}
                        type={'password'}
                    />
                    <TextField
                        helperText={errors.passwordConfirmation?.message}
                        error={errors.passwordConfirmation ? true : false}
                        {...register('passwordConfirmation')}
                        label={'Confirm Password'}
                        variant={'outlined'}
                        type={'password'}
                    />
                    <Link component={RouterLink} to='/signin' sx={{ textDecoration: 'none' }}>
                        <Typography align={'center'} color={'#e5ebea'}>
                            Already have an account?
                        </Typography>
                    </Link>
                    <LoadingButton
                        loading={response.isLoading}
                        variant={'contained'}
                        type={'submit'}
                        size={'large'}
                    >
                        Register
                    </LoadingButton>
                </Stack>
            </Stack>
        </>
    );
}
