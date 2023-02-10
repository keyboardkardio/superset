import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { userRouter } from '#/user/user.router';
import { exerciseRouter } from '#/exercise/exercise.router';
import { workoutRouter } from '#/workout/workouts.router';

import { authenticate, authorize } from '#shared/middleware/jwt.middleware';
import { errorHandler } from '#shared/middleware/error.middleware';
import { notFoundHandler } from '#shared/middleware/not-found.middleware';

export const server = express();

// Parse all incoming requests.
server.use(express.json());

// Enable cross-origin resource sharing.
server.use(cors());

// Set HTTP headers.
server.use(helmet());

server.use('/api/users', userRouter);

// Authenticate and authorize all requests from this point on.
server.use(authenticate, authorize);
server.use('/api/exercises', exerciseRouter);
server.use('/api/workouts', workoutRouter);

server.use(errorHandler);
server.use(notFoundHandler);
