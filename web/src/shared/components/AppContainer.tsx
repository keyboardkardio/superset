import React from 'react';
import { Box } from '@chakra-ui/react';
import barbell from '@/assets/images/barbell.jpg';

export default function AppContainer({ children }: { children: React.ReactNode }) {
    return (
        <Box
            bgImg={`linear-gradient(rgba(22, 22, 22, 0.702),
                    rgba(0, 0, 0, 0.946)), url(${barbell})`}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            minHeight={'100vh'}
        >
            {children}
        </Box>
    );
}
