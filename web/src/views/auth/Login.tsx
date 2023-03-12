import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { usePost } from '../../hooks/usePost';
import { IAppUser } from '../../types';
import { registrationSchema } from './Register';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface LoginResponse {
    appUser: IAppUser;
    token: string;
}

const loginSchema = registrationSchema.pick(['username', 'password']);

export interface LoginFormValues extends yup.InferType<typeof loginSchema> {}

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, response] = usePost<LoginResponse>(`${baseUrl}/users/login`);
    const onSubmit = async (credentials: LoginFormValues) => {
        try {
            setLoading(true);
            await post({ body: credentials });
            if (response.status == 200) {
                localStorage.setItem('@superset:appUser', JSON.stringify(response.data?.appUser));
                localStorage.setItem('@superset:token', JSON.stringify(response.data?.token));
                navigate('/');
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'90vh'}>
            <Typography variant={'h1'}>Sign In</Typography>
            <Stack component={'form'} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    focused
                    color={'primary'}
                    type={'text'}
                    variant={'outlined'}
                    label={'Username'}
                    {...register('username')}
                    error={errors.username ? true : false}
                    helperText={errors.username?.message}
                />
                <TextField
                    focused
                    type={'password'}
                    variant={'outlined'}
                    label={'Password'}
                    {...register('password')}
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                />
                <Link component={RouterLink} to='/signup' sx={{ textDecoration: 'none' }}>
                    <Typography align={'center'}>Need an account?</Typography>
                </Link>
                <LoadingButton loading={loading} type={'submit'} size={'large'} variant={'contained'}>
                    Login
                </LoadingButton>
            </Stack>
        </Box>
    );
}
