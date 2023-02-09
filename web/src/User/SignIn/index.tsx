import { Heading } from '@chakra-ui/react';
import SignInForm from './SignInForm';

export default function SignIn() {

    return (
        <>
            <Heading size='4xl' textAlign='right' color='green.600'>Sign In</Heading>
            <SignInForm />
        </>
    );
}
