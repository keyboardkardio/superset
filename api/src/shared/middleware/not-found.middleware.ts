import { Request, Response, NextFunction } from 'express';

/** A middleware function that catches `404` conditions. */

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
    const message = 'Resource not found';

    response.status(404).send(message);
};
