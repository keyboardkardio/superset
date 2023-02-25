import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { usePost } from '../../hooks/usePost';
import { IAppUser } from '../../types';
import { registrationSchema } from './Register';
import * as yup from 'yup';

const baseUrl = process.env.REACT_APP_DB_URL;

interface LoginResponse {
    appUser: IAppUser;
    token: string;
}

const loginSchema = registrationSchema.pick(['username', 'password']);

export interface LoginFormValues extends yup.InferType<typeof loginSchema> {}

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });
    
    const navigate = useNavigate();
    const [post, response] = usePost<LoginResponse>(`${baseUrl}/users/login`);
    const onSubmit = async (credentials: LoginFormValues) => {
        try {
            await post({ body: credentials });
            if (response.status == 200) {
                localStorage.setItem('@superset:appUser', JSON.stringify(response.data?.appUser));
                localStorage.setItem('@superset:token', JSON.stringify(response.data?.token));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Sign In</h1>
            <Stack component={'form'} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type={'text'}
                    variant={'outlined'}
                    label={'Username'}
                    {...register('username')}
                    error={errors.username ? true : false}
                    helperText={errors.username?.message}
                />
                <TextField
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
