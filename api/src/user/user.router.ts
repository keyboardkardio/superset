import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../shared/services/prisma.service';
import { sanitizeUser } from './user.utils';

export const userRouter = express.Router();

userRouter.post('/register', async (request, response) => {
    const { username, password, passwordConfirmation } = request.body;

    if (password !== passwordConfirmation) {
        response.status(400).json({ error: 'Passwords do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: 'USER',
        },
    });

    response.status(201).json(sanitizeUser(user));
});

userRouter.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            response.status(401).json({ error: 'Invalid credentials.' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            response.status(500).json({ error: ' Invalid credentials' });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            response.status(500).end();
            throw new Error('JWT secret is not set.');
        }

        const tokenContent = { username: user.username, id: user.id };
        const token = jwt.sign(tokenContent, JWT_SECRET, { expiresIn: 60 * 60 * 2 });

        response.status(200).json({ id: user.id, username: user.username, token });
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
