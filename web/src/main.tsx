import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { router } from '@/router';
import barbell from '@/assets/images/barbell.jpg';

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
            <Box
                backdropBlur={'3xl'}
                backdropFilter={'auto'}
                bgColor={'gray.700'}
                bgImg={`linear-gradient(rgba(22, 22, 22, 0.702), 
                        rgba(0, 0, 0, 0.946)), url(${barbell})`}
                bgRepeat={'no-repeat'}
                bgSize={'cover'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                minH={'100vh'}
                padding={'2.8rem 1.4rem'}
            >
                <RouterProvider router={router} />
            </Box>
        </ChakraProvider>
    </StrictMode>,
);
