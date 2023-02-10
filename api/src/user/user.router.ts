import { Request, Response, Router } from 'express';
import * as authService from '#/auth/auth.service';

export const userRouter = Router();

userRouter.post('/register', async (request: Request, response: Response) => {
    const { username, password, passwordConfirmation } = request.body;
    if (password !== passwordConfirmation) {
        response.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
       const user = await authService.createNewUser(username, password)

        response.status(201).json(user);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});

userRouter.post('/login', async (request: Request, response: Response) => {
    const { username, password } = request.body;
    
    try {
        /** Include the user and their saved workouts in the response to avoid another request-response cycle. */
        const userWithWorkoutsAndToken = await authService.loginUser(username, password);

        response.status(200).json(userWithWorkoutsAndToken);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
