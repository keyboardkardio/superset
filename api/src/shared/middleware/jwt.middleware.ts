import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { getTokenFrom } from '#/auth/token.service';

const SECRET = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export function authenticate(request: CustomRequest, response: Response, next: NextFunction) {
    const token = getTokenFrom(request);
    if (!token) {
        return response.status(401).json({ error: 'Unauthorized: No token provided.' });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET || '') as JwtPayload;
        request.user = decodedToken;
        next();

        return;
    } catch (error) {
        return response.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
}

export function authorize(role: Role) {
    return (request: CustomRequest, response: Response, next: NextFunction) => {
        if (request.user?.role !== role) {
            return response.status(401).json({ error: 'Unauthorized: Insufficient role.' });
        }
        next();

        return;
    };
}
