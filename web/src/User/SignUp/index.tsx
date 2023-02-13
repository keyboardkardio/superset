import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Link, Stack } from '@chakra-ui/react';
import { SignInFormValues } from '../SignIn';

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface SignUpFormValues extends SignInFormValues {
    passwordConfirmation: string;
}

export default function SignUp() {
    const navigate = useNavigate();
    const { reset, register, handleSubmit } = useForm<SignUpFormValues>();

    const onSubmit = async (form: SignUpFormValues) => {
        try {
            const response = await fetch(`${baseUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (response.status === 201) {
                reset();
                navigate('/sign_in');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Heading size='4xl' textAlign='right' color='green.600'>
                Sign Up
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <Input
                        size='lg'
                        color='gray.400'
                        placeholder='Username'
                        {...register('username')}
                    />
                    <Input
                        type='password'
                        size='lg'
                        color='gray.400'
                        placeholder='Password'
                        {...register('password')}
                    />
                    <Input
                        type='password'
                        size='lg'
                        color='gray.400'
                        placeholder='Confirm Password'
                        {...register('passwordConfirmation')}
                    />
                    <Link as={RouterLink} to='/sign_in' color='gray.400' textAlign='center'>
                        Already have an account?
                    </Link>
                    <Button type='submit' size='lg' bgColor='green.400'>
                        Create Account
                    </Button>
                </Stack>
            </form>
        </>
    );
}
