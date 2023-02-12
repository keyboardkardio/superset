import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Collapse,
    Flex,
    Heading,
    IconButton,
    Link,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

export default function AppBar() {
    const { isAuthenticated } = useContext(AuthContext);
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Heading color={'green.500'} fontWeight={400} fontSize={'3xl'}>SuperSet</Heading>
        </Box>
    );
}
