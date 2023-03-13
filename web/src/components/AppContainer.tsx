import { Stack } from '@mui/material';

export function AppContainer({children}: {children: React.ReactNode}) {
    return (
        <Stack padding={'3rem 1.4rem'} bgcolor={'#191919'} height={'100vh'} justifyContent={'space-between'}>
            {children}
        </Stack>
    )
}