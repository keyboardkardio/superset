import { Stack } from '@mui/material';

export function AppContainer({children}: {children: React.ReactNode}) {
    return (
        <Stack padding={'2rem 1rem'} bgcolor={'#0A0A0A'} height={'100vh'} justifyContent={'space-between'}>
            {children}
        </Stack>
    )
}