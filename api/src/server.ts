import * as http from 'http';
import { app } from './app';

export const server: http.Server = http.createServer(app);
