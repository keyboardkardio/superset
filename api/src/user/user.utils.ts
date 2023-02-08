import { User } from '@prisma/client';

export function sanitizeUser(user: User) {
    return {
        id: user.id,
        username: user.username,
        role: user.role,
    };
}