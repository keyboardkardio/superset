import { Heading, Stack } from '@chakra-ui/react';
import PrimaryButton from '../shared/components/buttons/PrimaryButton';

export default function Home() {
    return (
        <>
            <Heading size={'4xl'} textAlign={'right'} color={'green.600'}>SuperSet</Heading>
            <Stack spacing={4}>
                <Stack spacing={4} direction='row'>
                    <PrimaryButton to={'/sign_in'}>Login</PrimaryButton>
                    <PrimaryButton to={'/sign_up'}>Register</PrimaryButton>
                </Stack>
                <PrimaryButton to={'/'}>Demo Application</PrimaryButton>
            </Stack>
        </>
    );
}
