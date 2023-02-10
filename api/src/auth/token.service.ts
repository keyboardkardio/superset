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
    const payload = {
        id: params.id,
        username: params.username,
        role: Role.USER,
    };

    return jwt.sign(payload, SECRET, { expiresIn: 60 * 60 * 2 });
}

export function getTokenFrom(request: Request): string | null {
    const valueInAuthHeader = request.headers.authorization;

    if (valueInAuthHeader && valueInAuthHeader.startsWith('Bearer ')) {
        return valueInAuthHeader.replace('Bearer ', '');
    }

    return null;
}

export function getUserIdFrom(token: string) {
    const decodedToken = jwt.verify(token, SECRET) as JwtPayload;

    return decodedToken.id;
}