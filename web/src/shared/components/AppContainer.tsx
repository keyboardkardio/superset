import React from 'react';
import { Box } from '@chakra-ui/react';
import barbell from '../../assets/images/barbell.jpg';

export function AppContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box
            bgImg={`linear-gradient(rgba(22, 22, 22, 0.702),
                    rgba(0, 0, 0, 0.946)), url(${barbell})`}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            display={'flex'}
            flexDirection={'column'}
            minHeight={'100vh'}
            justifyContent={'space-between'}
            padding={'4rem 1rem'}
        >
            {children}
        </Box>
    );
}
