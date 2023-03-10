import express from 'express';
import * as authService from '../auth/auth.service';

export const userRouter = express.Router();

userRouter.post('/register', async (req: express.Request, res: express.Response) => {
    const { username, password, passwordConfirmation } = req.body;
    if (!username || !password || !passwordConfirmation) {
        res.status(400).json({error: 'Username, password, and password confirmation are required.'});
    }

    if (password !== passwordConfirmation) {
        res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        const user = await authService.createNewUser(username, password);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/login', async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const appUser = await authService.loginUser(username, password);
        res.status(200).json(appUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
