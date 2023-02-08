import { server } from './server';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

server.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
});
