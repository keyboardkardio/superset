import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { router } from '@/router';
import { ContainerApp } from '@/components';
import barbell from '@/assets/images/barbell.jpg'

const fonts = {
    default: {
        body: 'Urbanist',
        headings: 'Urbanist',
    },
};

const theme = extendTheme({ fonts });

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <ContainerApp backgroundImage={barbell}>
                <RouterProvider router={router} />
            </ContainerApp>
        </ChakraProvider>
    </StrictMode>,
);
