import { AnswerEventProps, Game, Player } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { endQuestion, Games, playerAnswered } from '../game/Game';

export const registerAnswerListener = async (socket: Socket) => {
    socket.on('answer', async ({ playerId, gameId, pointsEarned }: AnswerEventProps) => {
        const game: Game | undefined = Games.find((game) => game.code === gameId);

        if (!game) {
            return null;
        }

        const player: Player | undefined = game.players.find((player) => player.id === playerId);

        if (!player) {
            return null;
        }

        const isCorrect = pointsEarned > 0;
        game.answers++;

        playerAnswered(game, player, isCorrect, pointsEarned);

        if (game.answers === game.players.length) {
            endQuestion(game);
        }
    });
};
