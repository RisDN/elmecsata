import { Express } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { initGetGameRoute } from '../api/get-game/route';
import { initOnGoingGamesRoute } from '../api/ongoing-games/route';
import { initStartGameRoute } from '../api/start-game/route';
import { initStartPlayRoute } from '../api/start-play/route';
import { initValidCodeRoute } from '../api/valid-code/route';
import { removePlayer } from './game/Game';
import { registerSocketListeners } from './listeners';

export const app: Express = require('express')();
app.use(require('cors')());
app.use(require('body-parser').json());

const PORT = 3001;

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket: Socket) => {
    console.log(`[CONNECTION]: ${socket.id} - total: ${io.engine.clientsCount}`);

    registerSocketListeners(socket);

    socket.on('disconnect', () => {
        removePlayer(socket);
    });
});

server.listen(PORT, async () => {
    console.log('[WS RUNNING]: port ---> ' + PORT);

    initValidCodeRoute();
    initOnGoingGamesRoute();
    initGetGameRoute();
    initStartGameRoute();
    initStartPlayRoute();
});
