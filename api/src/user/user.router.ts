import { Request, Response, Router } from 'express';
import * as authService from '../auth/auth.service';

export const userRouter = Router();

userRouter.post('/register', async (request: Request, response: Response) => {
    const { username, password, passwordConfirmation } = request.body;
    if (!username) {
        response.status(400).json({ error: 'Username is required.' });
    }
    if (!password) {
        response.status(400).json({ error: 'Password is required.' });
    }
    if (!passwordConfirmation) {
        response.status(400).json({ error: 'Please confirm your password.' });
    }
    if (password !== passwordConfirmation) {
        response.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        const user = await authService.createNewUser(username, password);
        response.status(201).json(user);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});

userRouter.post('/login', async (request: Request, response: Response) => {
    const { username, password } = request.body;
    if (!username) {
        response.status(400).json({ error: 'Username is required.' });
    }
    if (!password) {
        response.status(400).json({ error: 'Password is required.' });
    }

    try {
        const token = await authService.loginUser(username, password);
        response.status(200).json({ token });
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
