import { Flex } from '@chakra-ui/react';
import { SignUpForm } from './SignUpForm';

export function SignUp() {
    return (
        <Flex direction={'column'} justifyContent={'space-between'} minHeight={'80vh'}>
            <SignUpForm />
        </Flex>
    );
}
