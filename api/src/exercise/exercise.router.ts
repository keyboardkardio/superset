import { Request, Response, Router} from 'express';
import { prisma } from '../shared/services/prisma.service';

export const exerciseRouter = Router();

exerciseRouter.get('/', async (request: Request, response: Response) => {
    const exercises = await prisma.exercise.findMany();

    response.json(exercises);
});

exerciseRouter.get(`/:id`, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);

    try {
        const exercise = await prisma.exercise.findUnique({ where: { id } });
        if (exercise) {
            response.status(200).json(exercise);
        }
        
        response.status(404).json({ error: `Exercise: ${id} does not exist in our database.` });
    } catch (error: any) {
        response.status(500).json({ error: error.message })
    }
});
