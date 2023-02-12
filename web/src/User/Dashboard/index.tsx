import { Stack } from '@chakra-ui/react';
import PrimaryButton from '@/shared/components/buttons/PrimaryButton';

export default function Dashboard() {

    return (
        <Stack>
            <PrimaryButton to={'/create_workout'}>Create Workout</PrimaryButton>
            <PrimaryButton to={'/workout_log'}>Workout Log</PrimaryButton>
        </Stack>
    );
}
