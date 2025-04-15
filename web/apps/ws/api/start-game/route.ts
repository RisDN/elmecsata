import { app } from '../../src';
import { Request, Response } from 'express';
import { Games, setGameState } from '../../src/game/Game';
import { Game } from '@elmecsata/types';

export const initStartGameRoute = () => {
    app.post('/api/start-game', (req: Request, res: Response) => {
        const { code } = req.body;

        const game: Game | undefined = Games.find((game) => game.code === code);

        if (!game) {
            res.json({ error: 'Game not found' });
        } else {
            setGameState(code, 'playing');
            res.json(game);
        }
    });
};
