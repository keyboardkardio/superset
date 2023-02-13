import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AppBar() {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <Box
            backgroundColor={'green.400'}
            padding={'1rem'}
            position={'fixed'}
            width={'100%'}
            bottom={0}
            marginTop={'2rem'}
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
                        <MenuItem as={Link} to={'/create_workout'}>
                            Create Workout
                        </MenuItem>
                        <MenuItem as={Link} to={'/workout_log'}>
                            Workout Log
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Heading>SuperSet</Heading>
                { isAuthenticated
                    ? <Button variant={'unstyled'} onClick={() => localStorage.removeItem('token')}>Sign Out</Button>
                    : <Button as={Link} to={'/sign_in'}>Sign In</Button>
                }
            </HStack>
        </Box>
    );
}
