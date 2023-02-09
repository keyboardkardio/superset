import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Link, Stack } from '@chakra-ui/react';
import storage from '@/utils/storage';
import api from '@/lib/api';
import { User } from '..';

export interface SignInFormValues {
    username: string;
    password: string;
}

const loginUser = async (form: SignInFormValues) => {
    const response = await api.post<User>('/users/login', form);
    return response.data;
};

export default function SignInForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const { reset, register, handleSubmit } = useForm<SignInFormValues>();
    const handleLogin = async (form: SignInFormValues) => {
        try {
            const user = await loginUser(form);
            storage.setToken(user.token)
            setUser(user);
            reset();
            navigate('/create_workout');
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
                <Link
                    as={RouterLink}
                    to={'/sign_up'}
                    color={'gray.400'}
                    textAlign={'center'}
                >
                    Don't have an account?
                </Link>
                <Button type={'submit'} size={'lg'} bgColor={'green.400'}>
                    Sign In
                </Button>
            </Stack>
        </form>
    );
}
