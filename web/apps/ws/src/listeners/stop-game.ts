import { Game } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { io } from '..';
import { Games } from '../game/Game';

export const registerStopGameListener = async (socket: Socket) => {
    socket.on('stop-game', async (code: string) => {
        const game: Game | undefined = Games.find((game) => game.code === code);

        if (!game) {
            return;
        }
        console.log(`[STOP GAME]: ${socket.id} ---> ${game.code}`);
        io.to(game.code).emit('game-stopped');
        io.socketsLeave(game.code);
        Games.slice(Games.indexOf(game), 1);
    });
};
