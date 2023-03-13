import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Link, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { usePost } from '../../hooks/usePost';
import { IAppUser } from '../../types';
import { registrationSchema } from './Register';
import { Logo } from '../../components/Logo';
import { Title } from '../../components/Title';

const loginSchema = registrationSchema.pick(['username', 'password']);

interface LoginResponse {
    appUser: IAppUser;
    token: string;
}

export interface LoginFormValues extends yup.InferType<typeof loginSchema> {}

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate();
    const [post, response] = usePost<LoginResponse>('users/login');
    const onSubmit = async ({ username, password }: LoginFormValues) => {
        try {
            await post({ body: { username, password } });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (response.data) {
            const { appUser, token } = response.data;
            localStorage.setItem('@superset:appUser', JSON.stringify(appUser));
            localStorage.setItem('@superset:token', token);
            navigate('/');
            location.reload();
        }
    }, [response.data]);

    return (
        <>
            <Logo />
            <Stack spacing={4}>
                <Title>Sign In</Title>
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
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        {...register('password')}
                        variant={'outlined'}
                        label={'Password'}
                        type={'password'}
                    />
                    <Link component={RouterLink} to='/signup' sx={{ textDecoration: 'none' }}>
                        <Typography align={'center'} color={'#e5ebea'}>
                            Need an account?
                        </Typography>
                    </Link>
                    <LoadingButton
                        loading={response.isLoading}
                        variant={'contained'}
                        type={'submit'}
                        size={'large'}
                    >
                        Login
                    </LoadingButton>
                </Stack>
            </Stack>
        </>
    );
}
