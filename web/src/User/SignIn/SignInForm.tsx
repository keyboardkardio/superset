import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Link, Stack } from '@chakra-ui/react';
import { AuthContext } from '../../shared/AuthContext';

export interface SignInFormValues {
    username: string;
    password: string;
}

export function SignInForm() {
    const { register, handleSubmit } = useForm<SignInFormValues>();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (formValues: SignInFormValues) => {
        await login(formValues);
        navigate('/dashboard');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <Input
                        type={'text'}
                        size={'lg'}
                        color={'gray.400'}
                        placeholder={'Username'}
                        backdropFilter={'auto'}
                        backdropBlur={'sm'}
                        backgroundColor={'rgba(171, 171, 171, 0.15)'}
                        {...register('username')}
                    />
                    <Input
                        type={'password'}
                        size={'lg'}
                        color={'gray.400'}
                        placeholder={'Password'}
                        backdropFilter={'auto'}
                        backdropBlur={'sm'}
                        backgroundColor={'rgba(171, 171, 171, 0.15)'}
                        {...register('password')}
                    />
                    <Link as={RouterLink} to={'/signup'} color={'gray.400'} textAlign={'center'}>
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
