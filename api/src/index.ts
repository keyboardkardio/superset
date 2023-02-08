import { server } from './server';

const SERVER_PORT = process.env.SERVER_PORT;

server.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
});
