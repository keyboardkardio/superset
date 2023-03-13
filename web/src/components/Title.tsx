import Typography from '@mui/material/Typography';

export function Title({ children }: { children: React.ReactNode }) {
    return (
        <Typography variant={'h2'} align={'center'}>{children}</Typography>
    )
}
