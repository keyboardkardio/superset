import express from 'express';

export function notFoundHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const message = `Resource not found: ${req.method} ${req.url}`;

    res.status(404).send(message);
};
