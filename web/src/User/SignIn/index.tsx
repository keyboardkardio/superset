import { Flex, Heading } from '@chakra-ui/react';
import { SignInForm } from './SignInForm';

export function SignIn() {
    return (
        <Flex direction={'column'} justifyContent={'space-between'} height={'80vh'}>
            <Heading size={'4xl'} textAlign={'right'} color={'green.600'}>
                Sign In
            </Heading>
            <SignInForm />
        </Flex>
    );
}
