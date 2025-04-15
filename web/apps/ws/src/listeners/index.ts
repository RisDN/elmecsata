import { Socket } from 'socket.io';
import { registerStartGameListeners } from './start-game';
import { registerJoinGameListener } from './join-game';
import { registerAnswerListener } from './answer';
import { registerEmoteListener } from './emote';
import { registerStartPlayListener } from './start-play';
import { registerStopGameListener } from './stop-game';
import { registerKickListener } from './kick';

export const registerSocketListeners = (socket: Socket) => {
    registerStartGameListeners(socket);
    registerJoinGameListener(socket);
    registerAnswerListener(socket);
    registerEmoteListener(socket);
    registerStartPlayListener(socket);
    registerStopGameListener(socket);
    registerKickListener(socket);
};
