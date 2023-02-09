import { Button, Heading, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <Heading size={'4xl'} textAlign={'right'} color={'green.600'}>SuperSet</Heading>
            <Stack spacing={4}>
                <Stack spacing={4} direction='row'>    
                    <Button
                        variant={'outline'}
                        size={'lg'}
                        w={'100%'}
                        color={'gray.100'}
                        bgColor={'rgba(255, 255, 255, 0.1)'}
                    >
                        <Link as={RouterLink} to='/sign_in'>
                            Login
                        </Link>
                    </Button>

                    <Button
                        variant={'outline'}
                        size={'lg'}
                        w={'100%'}
                        color={'gray.100'}
                        bgColor={'rgba(255, 255, 255, 0.1)'}
                    >
                        <Link as={RouterLink} to='/sign_up'>
                            Register
                        </Link>
                    </Button>
                </Stack>

                {/* TODO: Implement demo application for guests */}
                <Button
                    variant={'outline'}
                    size={'lg'}
                    w={'100%'}
                    color={'gray.100'}
                    bgColor={'rgba(255, 255, 255, 0.1)'}
                >
                    <Link as={RouterLink} to='/'>
                        Demo Application
                    </Link>
                </Button>
            </Stack>
        </>
    );
}
