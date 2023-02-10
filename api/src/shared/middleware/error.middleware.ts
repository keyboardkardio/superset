import { Request, Response, NextFunction } from 'express';
import HttpException from '#shared/http-exception';

/** A middleware function that handles HTTP request errors. */

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.statusCode || error.status || 500;

    response.status(status).send(error);
};
