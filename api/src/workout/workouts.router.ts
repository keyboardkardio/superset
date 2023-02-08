import express from 'express';
import jwt from 'jsonwebtoken';
import { getTokenFrom, JwtContent } from '../shared/services/token.service';
import * as workoutService from './workout.sevice';

export const workoutRouter = express.Router();

workoutRouter.get('/', async (_request, response) => {
    const workouts = await workoutService.findAll();
    if (workouts) response.json(workouts);

    response.sendStatus(404).end();
});

workoutRouter.get(`/:id`, async (request, response) => {
    const workout = await workoutService.findById(request.params.id);
    if (workout) response.json(workout);

    response.sendStatus(404).end();
});

workoutRouter.post('/', async (request, response) => {
    try {
        const token = getTokenFrom(request);
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as JwtContent;

        const userId: string = jwtObject.id;
        const workoutId: string = await workoutService.createWorkout(userId);
        await Promise.all(
            request.body.workoutItems.map(
                async (workoutItem: { exerciseId: number; sets: { reps: number; weight: number }[] }) => {
                    await workoutService.createWorkoutItemWithSets(workoutId, workoutItem.exerciseId, workoutItem.sets);
                },
            ),
        );

        const workout = await workoutService.findById(workoutId);

        response.status(201).json(workout);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            response.status(401).json({ error: 'Invalid token' });
        }

        response.status(500).json({ error: 'Server error' });
    }
});

workoutRouter.delete(`/workouts/:id`, (request, response) => {
    const id = request.params.id;
    workoutService.del(id);
    response.status(204).end();
});
