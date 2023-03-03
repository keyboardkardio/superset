import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { userRouter } from './user/user.router';
import { exerciseRouter } from './exercise/exercise.router';
import { workoutRouter } from './workout/workouts.router';

import { errorHandler } from './shared/middleware/error.middleware';
import { notFoundHandler } from './shared/middleware/not-found.middleware';

export const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/users', userRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/workouts', workoutRouter);

app.use(errorHandler);
app.use(notFoundHandler);
