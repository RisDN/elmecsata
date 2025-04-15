import { app } from '../../src';
import { Request, Response } from 'express';
import { Games } from '../../src/game/Game';
import { Game } from '@elmecsata/types';

export const initGetGameRoute = () => {
    app.post('/api/get-game', (req: Request, res: Response) => {
        const { code } = req.body;

        const game: Game | undefined = Games.find((game) => game.code === code);

        res.json(game);
    });
};
