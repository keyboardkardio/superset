import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Link, Stack } from '@chakra-ui/react';
import { AuthContext } from '@/Auth/AuthContext';
import { IWorkout } from '@/Workout';

export interface SignInFormValues {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string;
        username: string;
        role: string;
        workouts?: IWorkout[];
    };
    token: string;
}

export default function SignIn() {
    const { handleLogin } = useContext(AuthContext);
    const { register, handleSubmit } = useForm<SignInFormValues>();

    return (
        <>
            <Heading size='4xl' textAlign='right' color='green.600'>
                Sign In
            </Heading>
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
        </>
    );
}
