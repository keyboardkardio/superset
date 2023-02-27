import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { usePost } from '../../hooks/usePost';

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
    const { reset, register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
        resolver: yupResolver(registrationSchema),
    });
    
    const navigate = useNavigate();
    const [post, response] = usePost('users/register');
    const onSubmit = async (credentials: RegistrationFormValues) => {
        try {
            await post({ body: credentials });
            if (response.status == 201) {
                reset();
                navigate('/signin');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
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
                <TextField
                    type={'password'}
                    variant={'outlined'}
                    label={'Confirm Password'}
                    {...register('passwordConfirmation')}
                    error={errors.passwordConfirmation ? true : false}
                    helperText={errors.passwordConfirmation?.message}
                />
                <Link to='/signin'>
                    <Typography align={'center'}>Already have an account?</Typography>
                </Link>
                <Button type={'submit'} size={'large'} variant={'contained'}>
                    Register
                </Button>
            </Stack>
        </>
    );
}
