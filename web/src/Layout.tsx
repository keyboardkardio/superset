import { Outlet } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import AppContainer from '@/shared/components/AppContainer';
import AppBar from '@/shared/components/AppBar';
import '@fontsource/urbanist';

const theme = extendTheme({
    fonts: {
        body: 'Urbanist',
        heading: 'Urbanist',
    },
});

export default function Layout() {
    return (
        <ChakraProvider theme={theme}>
            <AppContainer>
                <Box padding={'1rem'}>
                    <Outlet />
                </Box>
                <AppBar />
            </AppContainer>
        </ChakraProvider>
    );
}
