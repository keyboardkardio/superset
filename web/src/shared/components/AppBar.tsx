import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';

export function AppBar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <Box
            bottom={0}
            width={'100%'}
            padding={'1rem'}
            position={'fixed'}
            marginTop={'2rem'}
            backgroundColor={'green.400'}
        >
            <HStack justify={'space-between'}>
                <Menu>
                    <MenuButton as={Button} backgroundColor={'transparent'}>
                        <HamburgerIcon boxSize={'1.4rem'} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to={'/dashboard'}>
                            Dashboard
                        </MenuItem>
                        <MenuItem as={Link} to={'/workouts/new'}>
                            Create Workout
                        </MenuItem>
                        <MenuItem as={Link} to={'/workouts/log'}>
                            Workout Log
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Heading>SuperSet</Heading>
                {user ? (
                    <Button type={'button'} variant={'unstyled'} onClick={() => logout()}>
                        Sign Out
                    </Button>
                ) : (
                    <Button as={Link} to={'/signin'} type={'button'} variant={'unstyled'}>
                        Sign In
                    </Button>
                )}
            </HStack>
        </Box>
    );
}
