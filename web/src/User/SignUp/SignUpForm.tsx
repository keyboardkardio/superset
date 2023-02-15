import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Link, Stack } from '@chakra-ui/react';
import { SignInFormValues } from '../SignIn/SignInForm';
import { usePost } from '../../shared/hooks/usePost';

const baseUrl = process.env.REACT_APP_DB_URL as string;

interface SignUpFormValues extends SignInFormValues {
    passwordConfirmation: string;
}

export function SignUpForm() {
    const navigate = useNavigate();
    const { reset, register, handleSubmit } = useForm<SignUpFormValues>();
    const [post, response] = usePost(`${baseUrl}/users/register`);

    const onSubmit = async (credentials: SignUpFormValues) => {
        try {
            await post({ body: credentials });
            if (response.status === 201) {
                reset();
                navigate('/signin');
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
                        backdropFilter={'auto'}
                        backdropBlur={'sm'}
                        backgroundColor={'rgba(171, 171, 171, 0.15)'}
                        {...register('username')}
                    />
                    <Input
                        type='password'
                        size='lg'
                        color='gray.400'
                        placeholder='Password'
                        backdropFilter={'auto'}
                        backdropBlur={'sm'}
                        backgroundColor={'rgba(171, 171, 171, 0.15)'}
                        {...register('password')}
                    />
                    <Input
                        type='password'
                        size='lg'
                        color='gray.400'
                        placeholder='Confirm Password'
                        backdropFilter={'auto'}
                        backdropBlur={'sm'}
                        backgroundColor={'rgba(171, 171, 171, 0.15)'}
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
