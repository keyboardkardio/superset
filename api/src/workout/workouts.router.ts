import { Request, Response, Router } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as tokenService from '../auth/token.service';
import * as workoutService from './workout.sevice';

export const workoutRouter = Router();

workoutRouter.get('/', async (request: Request, response: Response) => {
    const token = tokenService.getTokenFrom(request) as string;
    const workouts = await workoutService.findAllWorkouts(tokenService.getUserIdFrom(token));
    if (workouts) {
        response.json(workouts);
    }
});

workoutRouter.get(`/:id`, async (request: Request, response: Response) => {
    const workout = await workoutService.findById(request.params.id);
    if (workout) {
        response.json(workout);
    }
});

workoutRouter.get('/latest', async (request: Request, response: Response) => {
    const token = tokenService.getTokenFrom(request) as string;
    const workout = await workoutService.findLastWorkout(tokenService.getUserIdFrom(token));
    if (workout) {
        response.json(workout);
    }
})

workoutRouter.post('/', async (request: Request, response: Response) => {
    try {
        const token = tokenService.getTokenFrom(request) as string;
        const workoutId = await workoutService.createWorkout(tokenService.getUserIdFrom(token));

        await Promise.all(
            request.body.workoutItems.map(
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

        response.status(201).json(workout);
    } catch (error: any) {
        if (error instanceof JsonWebTokenError) {
            response.status(401).json({ error: 'Invalid token' });
        }

        response.status(500).json({ error: error.message });
    }
});

workoutRouter.delete(`/workouts/:id`, async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        await workoutService.deleteWorkout(id);

        response.status(204).end();
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
