import { Game } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { io } from '..';
import { Games, setGameState } from '../game/Game';

export const registerStartPlayListener = async (socket: Socket) => {
    socket.on('start-play', async (code: string) => {
        const game: Game | undefined = Games.find((game) => game.code === code);

        if (!game) {
            return;
        }
        console.log(`[START PLAY]: ${socket.id} ---> ${game.code}`);

        io.to(game.code).emit('start-countdown');
        setGameState(game.code, 'playing');
    });
};
