import { Outlet } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import AppContainer from '@/shared/components/AppContainer';

const fonts = {
    default: {
        body: 'Urbanist',
        headings: 'Urbanist',
    },
};

const theme = extendTheme({ fonts });

export default function Layout() {
    return (
        <ChakraProvider theme={theme}>
            <AppContainer>
                <Outlet />
            </AppContainer>
        </ChakraProvider>
    );
}
