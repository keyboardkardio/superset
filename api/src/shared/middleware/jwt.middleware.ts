import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { getTokenFrom } from '../../auth/token.service';

const SECRET = process.env.JWT_SECRET || '';

interface CustomRequest extends express.Request {
    user?: JwtPayload;
}

export function authenticate(req: CustomRequest, res: express.Response, next: express.NextFunction) {
    const token = getTokenFrom(req);
    if (!token) {
        res.status(401).json({ error: 'Unauthorized: No token provided.' });
        return;
    }

    try {
        const decodedToken = jwt.verify(token, SECRET) as JwtPayload;
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
}

export function authorize(role: Role) {
    return (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
        if (req.user?.role !== role) {
            res.status(401).json({ error: 'Unauthorized: Insufficient role.' });
            return;
        }
        next();
    };
}
