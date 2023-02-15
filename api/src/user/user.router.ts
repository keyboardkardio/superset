import { Request, Response, Router } from 'express';
import * as authService from '../auth/auth.service';

export const userRouter = Router();

userRouter.post('/register', async (request: Request, response: Response) => {
    const { username, password, passwordConfirmation } = request.body;
    if (password !== passwordConfirmation) {
        throw new Error('Passwords do not match.');
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
    try {
        response.status(200).json(await authService.loginUser(username, password));
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
