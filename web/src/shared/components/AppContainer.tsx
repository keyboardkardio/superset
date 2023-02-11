import React from 'react';
import { Box } from '@chakra-ui/react';
import barbell from '@/assets/images/barbell.jpg';

export default function ContainerApp({ children }: { children: React.ReactNode }) {
    return (
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
            {children}
        </Box>
    );
}
