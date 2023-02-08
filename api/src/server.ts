import express from 'express';
import cors from 'cors';

import { userRouter } from './user/user.router';
import { exerciseRouter } from './exercise/exercise.router';
import { workoutRouter } from './workout/workouts.router';

export const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/exercises', exerciseRouter);
server.use('/api/workouts', workoutRouter);