import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { prisma } from '../shared/services/prisma.service';
import { sanitize } from '../user/user.sanitize';
import { generateTokenFor } from './token.service';

export async function loginUser(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
        throw new Error('Invalid credentials.');
    }

    const token = generateTokenFor(user);

    const appUser = sanitize(user, ['password']);
    
    return {appUser, token};
}

export async function createNewUser(username: string, password: string) {
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
}
