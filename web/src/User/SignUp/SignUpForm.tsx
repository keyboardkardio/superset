import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Link, Stack } from '@chakra-ui/react';
import api from '@/lib/api';
import { SignInFormValues } from '../SignIn/SignInForm';
import { User } from '..';

interface SignUpFormValues extends SignInFormValues {
    passwordConfirmation: string;
}

const registerUser = async (form: SignInFormValues) => {
    const response = await api.post<User>('/users/register', form);
    return response.data;
};

export default function SignUpForm() {
    const navigate = useNavigate();
    const { reset, register, handleSubmit } = useForm<SignUpFormValues>();

    const onSubmit = async (form: SignUpFormValues) => {
        try {
            const response = await registerUser(form);
        } catch (error) {
            console.log(error);
        } finally {
            reset();
            navigate('/sign_in');
        }
    };

    return (
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
                <Link
                    as={RouterLink}
                    to='/sign_in'
                    color='gray.400'
                    textAlign='center'
                >
                    Already have an account?
                </Link>
                <Button type='submit' size='lg' bgColor='green.400'>
                    Create Account
                </Button>
            </Stack>
        </form>
    );
}
