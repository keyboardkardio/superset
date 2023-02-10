import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { prisma } from '#/shared/services/prisma.service';
import { generateTokenFor } from './token.service';
import { sanitize } from '#/user/user.sanitize';

export async function loginUser(username: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                workouts: {
                    include: {
                        workoutItems: true,
                    },
                },
            },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                user: sanitize(user, ['password']),
                token: generateTokenFor(user),
            };
        }

        throw new Error('Invalid credentials.');
    } catch (error) {
        throw error;
    }
}

export async function createNewUser(username: string, password: string) {
    try {
        const userExists = await prisma.user.findUnique({ where: { username } });
        if (userExists) {
            throw new Error(`The username: ${username} is not available.`);
        }
        const user = await prisma.user.create({
            data: {
                username,
                password: await bcrypt.hash(password, 10),
                role: Role.USER,
            },
        });

        return sanitize(user, ['password']);
    } catch (error) {
        throw error;
    }
}
