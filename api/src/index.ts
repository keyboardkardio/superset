import http from 'http';
import { app } from './app';

const SERVER_PORT = process.env.SERVER_PORT || 7000;

const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
});
