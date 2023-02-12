import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Link, Stack } from '@chakra-ui/react';

export interface SignInFormValues {
    username: string;
    password: string;
}

export default function SignIn() {
    const { reset, register, handleSubmit } = useForm<SignInFormValues>();
    const navigate = useNavigate();

    const onSubmit = async (credentials: SignInFormValues) => {
        try {
            const response = await fetch('http://localhost:7000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const token = await response.json();
            if (response.ok) {
                reset();
                localStorage.setItem('token', token);
                navigate('/dashboard');
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
