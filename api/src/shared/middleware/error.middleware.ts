import express from 'express';
import HttpException from '../../shared/http-exception';

export function errorHandler(error: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) {
    const status = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';

    res.status(status).json({ error: message });
};
