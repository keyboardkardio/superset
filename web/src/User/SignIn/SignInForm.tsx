import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Link, Stack } from '@chakra-ui/react';
import storage from '@/utils/storage';

export interface SignInFormValues {
    username: string;
    password: string;
}

export default function SignInForm() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SignInFormValues>();
    const handleLogin = async (form: SignInFormValues) => {
        try {
            const response = await fetch('http://localhost:7000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (data.token) {
                storage.setToken(data.token);
                const { user, workouts } = data;
                navigate('/dashboard', { state: { user, workouts } });
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={4}>
                <Input
                    size={'lg'}
                    color={'gray.400'}
                    placeholder={'Username'}
                    {...register('username')}
                />
                <Input
                    type={'password'}
                    size={'lg'}
                    color={'gray.400'}
                    placeholder={'Password'}
                    {...register('password')}
                />
                <Link as={RouterLink} to={'/sign_up'} color={'gray.400'} textAlign={'center'}>
                    Don't have an account?
                </Link>
                <Button type={'submit'} size={'lg'} bgColor={'green.400'}>
                    Sign In
                </Button>
            </Stack>
        </form>
    );
}
