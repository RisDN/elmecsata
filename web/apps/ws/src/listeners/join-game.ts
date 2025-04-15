import { Game, Player } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { addPlayer, Games } from '../game/Game';

export const registerJoinGameListener = (socket: Socket) => {
    socket.on('join-game', async (code: string, rawPlayer: string) => {
        const player: Player = JSON.parse(rawPlayer);
        const game: Game | undefined = Games.find((game) => game.code === code);

        if (!game) {
            socket.emit('game-not-found');
            return;
        }

        addPlayer(player, code, socket);
    });
};
