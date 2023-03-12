import React from 'react';
import { Box } from '@mui/material';

export function AppContainer({children}: {children: React.ReactNode}) {
    return (
        <Box padding={'2rem 1rem'} bgcolor={'#ececec'} height={'100vh'}>
            {children}
        </Box>
    )
}