import express from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as tokenService from '../auth/token.service';
import * as workoutService from './workout.sevice';

export const workoutRouter = express.Router();

workoutRouter.get(
    '/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const token = tokenService.getTokenFrom(req) as string;
            const workouts = await workoutService.findAllWorkouts(tokenService.getUserIdFrom(token));
            res.status(200).json(workouts);
        } catch (err: any) {
            next(err);
        }
    },
);

workoutRouter.get(
    `/:id`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const workout = await workoutService.findById(req.params.id);
            res.status(200).json(workout);
        } catch (err: any) {
            next(err);
        }
    },
);

workoutRouter.get(
    '/latest',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const token = tokenService.getTokenFrom(req) as string;
            const workout = await workoutService.findLastWorkout(tokenService.getUserIdFrom(token));
            res.status(200).json(workout);
        } catch (err: any) {
            next(err);
        }
    },
);

workoutRouter.post(
    '/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const token = tokenService.getTokenFrom(req) as string;
            const workoutId = await workoutService.createWorkout(tokenService.getUserIdFrom(token));

            await Promise.all(
                req.body.workoutItems.map(
                    async (workoutItem: {
                        exerciseId: number;
                        sets: { reps: number; weight: number }[];
                    }) => {
                        await workoutService.createWorkoutItemWithSets(
                            workoutId,
                            workoutItem.exerciseId,
                            workoutItem.sets,
                        );
                    },
                ),
            );

            const workout = await workoutService.findById(workoutId);

            res.status(201).json(workout);
        } catch (err: any) {
            if (err instanceof JsonWebTokenError) {
                res.status(401).json({ error: 'Invalid token' });
            }
            next(err);
        }
    },
);

workoutRouter.delete(
    `/:id`,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const id = req.params.id;
            await workoutService.deleteWorkout(id);

            res.status(204).end();
        } catch (err: any) {
            next(err);
        }
    },
);
