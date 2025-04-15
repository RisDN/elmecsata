import { Game, Player } from '@elmecsata/types';
import { Socket } from 'socket.io';
import { io } from '..';
import { Games } from '../game/Game';

const cooldowns = new Map<string, number>();
const COOLDOWN_TIME = 5000; // 5 seconds

export const registerEmoteListener = (socket: Socket) => {
    socket.on('send-emote', async (emoteIndex: number, rawPlayer: string, code) => {
        const player: Player = JSON.parse(rawPlayer);
        const game: Game | undefined = Games.find((game) => game.code === code);

        if (!game) {
            return;
        }

        const currentTime = Date.now();
        if (cooldowns.has(player.id)) {
            const cooldownEndTime = cooldowns.get(player.id)!;
            if (cooldownEndTime > currentTime) {
                const remainingTime = Math.ceil((cooldownEndTime - currentTime) / 1000);
                socket.emit('emote-cooldown', remainingTime);
                return;
            }
        }

        cooldowns.set(player.id, currentTime + COOLDOWN_TIME);

        io.to(game.code).emit('emote-sent', player.nickname, emoteIndex, player.id);
    });
};
