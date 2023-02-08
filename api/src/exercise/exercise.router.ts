import express from 'express';
import { prisma } from '../shared/services/prisma.service';

export const exerciseRouter = express.Router();

exerciseRouter.get('/', async (_request, response) => {
    const exercises = await prisma.exercise.findMany();

    response.json(exercises);
});

exerciseRouter.get(`/:id`, async (request, response) => {
    const id: number = parseInt(request.params.id);
    const exercise = await prisma.exercise.findUnique({
        where: { id },
    });

    if (exercise) {
        response.json(exercise);
    }

    response.status(404).end();
});
