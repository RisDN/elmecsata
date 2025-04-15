import { app, io } from '../../src';
import { Request, Response } from 'express';
import { Games, setGameState } from '../../src/game/Game';
import { Game } from '@elmecsata/types';

export const initStartPlayRoute = () => {
    app.get('/api/start-play', (req: Request, res: Response) => {
        const game: Game = Games[0] ?? undefined;

        io.to(game.code).emit('start-countdown');
        setGameState(game.code, 'playing');
        res.json(game);
    });
};
