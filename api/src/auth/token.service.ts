import { Request } from 'express';
import { Role } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
    id: string;
    username: string;
    role: Role;
}

export function generateTokenFor(params: JwtPayload): string {
    const { id, username, role } = params;
    const payload = { id, username, role };
    const expiresIn = 60 * 60 * 2; // 2 hours

    return jwt.sign(payload, SECRET, { expiresIn });
}

export function getTokenFrom(request: Request): string | null {
    const valueInAuthHeader = request.headers.authorization;
    if (!valueInAuthHeader?.startsWith('Bearer ')) {
        throw new Error('Unauthorized: Missing token.');
    }

    return valueInAuthHeader.slice(7);
}

export function getUserIdFrom(token: string): string {
    const decodedToken = jwt.verify(token, SECRET) as JwtPayload;

    return decodedToken.id;
}
