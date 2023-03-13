import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export function AppBar() {
    return (
        <Stack
            direction={'row'}
            border={'1px solid #1cdc82'}
            height={'3rem'}
            borderRadius={'2rem'}
            justifyContent={'space-around'}
        >
            <IconButton>
                <Link to='/'>
                    <HomeIcon color={'primary'} />
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/workouts'>
                    <AssignmentIcon color={'primary'} />
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/workouts/add'>
                    <AddIcon color={'primary'} />
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/workouts/statistics'>
                    <LegendToggleIcon color={'primary'} />
                </Link>
            </IconButton>
            <IconButton>
                <Link to='/settings'>
                    <SettingsIcon color={'primary'} />
                </Link>
            </IconButton>
        </Stack>
    );
}
