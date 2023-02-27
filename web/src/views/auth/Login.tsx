import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { usePost } from '../../hooks/usePost';
import { IAppUser } from '../../types';
import { registrationSchema } from './Register';

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
            location.reload();
        }
    }, [response.data]);

    return (
        <>
            <h1>Sign In</h1>
            <Stack component={'form'} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    focused
                    type={'text'}
                    variant={'outlined'}
                    color={'primary'}
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
                <Link to='/signup'>
                    <Typography align={'center'}>Need an account?</Typography>
                </Link>
                <Button type={'submit'} size={'large'} variant={'contained'}>
                    Login
                </Button>
            </Stack>
        </>
    );
}
