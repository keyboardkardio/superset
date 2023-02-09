import { Heading } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';

export default function SignUp() {
    return (
        <>
            <Heading size='4xl' textAlign='right' color='green.600'>Sign Up</Heading>
            <SignUpForm />
        </>
    );
}
