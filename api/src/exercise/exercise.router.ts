import express from 'express';
import { prisma } from '../shared/services/prisma.service';

export const exerciseRouter = express.Router();

exerciseRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const exercises = await prisma.exercise.findMany();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve exercises.' });
    }
});

exerciseRouter.get(`/:id`, async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const exercise = await prisma.exercise.findUnique({ where: { id } });
        if (!exercise) {
            res.status(404).json({ error: `Exercise with id ${id} not found.` });
        }
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve exercise.' });
    }
});
