import React from 'react';
import { Box } from '@mui/material';

export function AppContainer({children}: {children: React.ReactNode}) {
    return (
        <Box padding={'2rem 1rem'} bgcolor={'#F2EFEB'} minHeight={'100vh'}>
            {children}
        </Box>
    )
}