import { getQuizById } from '@elmecsata/database';
import { Socket } from 'socket.io';
import { startGame } from '../game/Game';
import { Game } from '@elmecsata/types';

export const registerStartGameListeners = async (socket: Socket) => {
    socket.on('start-game', async (quizId: string, hostId: string) => {
        const quiz = await getQuizById(parseInt(quizId));

        if (!quiz) {
            return;
        }

        const game: Game = await startGame(quiz, hostId);
        socket.join(game.code);
        socket.emit('start-game-callback', JSON.stringify(game));
    });
};
