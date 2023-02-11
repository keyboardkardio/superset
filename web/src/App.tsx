import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '@/Auth/AuthContext';
import { router } from '@/router';
import ContainerApp from '@/shared/components/AppContainer';

const fonts = {
    default: {
        body: 'Urbanist',
        headings: 'Urbanist',
    },
};

const theme = extendTheme({ fonts });

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <ContainerApp>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ContainerApp>
        </ChakraProvider>
    );
}
