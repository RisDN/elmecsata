import { Game } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { io } from '..';
import { Games } from '../game/Game';

export const registerKickListener = (socket: Socket) => {
    socket.on('kick-player', async (playerId: string, code: string) => {
        const game: Game | undefined = Games.find((game) => game.code === code);
        console.log('game', game);
        if (!game) {
            socket.emit('game-not-found');
            return;
        }

        const player = game.players.find((player) => player.id === playerId);

        if (!player) {
            socket.emit('player-not-found');
            return;
        }

        game.players = game.players.filter((player) => player.id !== playerId);
        io.to(game.code).emit('player-kicked', player.nickname, JSON.stringify(game.players));
    });
};
