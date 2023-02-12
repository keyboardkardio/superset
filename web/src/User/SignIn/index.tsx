import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/shared/context/AuthContext';
import { IAppUser } from '@/User';
import { IWorkout } from '@/Workout';
import api from '@/lib/api';
import { Button, Heading, Input, Link, Stack } from '@chakra-ui/react';

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

const initialUserState = {
    user: {
        id: '',
        username: '',
        role: '',
        workouts: [],
    },
};

export default function SignIn() {
    const { register, handleSubmit } = useForm<SignInFormValues>();
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState<IAppUser>(initialUserState);
    const navigate = useNavigate();

    const onSubmit = async (credentials: SignInFormValues) => {
        try {
            const response = await api.post<LoginResponse>('/users/login', JSON.stringify(credentials));
            const { user, token } = response.data;
            if (token && response.status === 200) {
                localStorage.setItem('token', token);
                setAuthenticated(true);
                setUser({
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        workouts: user.workouts,
                    },
                });
                navigate('/dashboard', { state: { user } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Heading size='4xl' textAlign='right' color='green.600'>
                Sign In
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
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
