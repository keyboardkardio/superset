import { Text } from '@chakra-ui/react';
import { SignIn } from '../../User/SignIn';
import { useAuth } from '../AuthContext';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <>
                <Text>Loading..</Text>
            </>
        );
    }

    return user ? <>{children}</> : <SignIn />;
};
