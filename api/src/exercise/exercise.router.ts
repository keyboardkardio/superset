import { Request, Response, Router } from 'express';
import { prisma } from '../shared/services/prisma.service';

export const exerciseRouter = Router();

exerciseRouter.get('/', async (request: Request, response: Response) => {
    try {
        const exercises = await prisma.exercise.findMany();
        
        response.json(exercises);
    } catch (error: any) {
        response.json({ error: error.message });
    }
});

exerciseRouter.get(`/:id`, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);

    try {
        const exercise = await prisma.exercise.findUnique({ where: { id } });
        if (!exercise) {
            response.status(404).json({ error: `Exercise: ${id} does not exist in our database.` });
        }

        response.status(200).json(exercise);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});
