import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './shared/components/AppBar';
import { AppContainer } from './shared/components/AppContainer';
import '@fontsource/urbanist';

const theme = extendTheme({
    fonts: {
        heading: 'Urbanist',
        body: 'Urbanist',
    },
});

export function Root() {
    return (
        <ChakraProvider theme={theme}>
            <AppContainer>
                <Outlet />
            </AppContainer>
            <AppBar />
        </ChakraProvider>
    );
}
