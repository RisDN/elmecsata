import { Request, Response } from 'express';
import { app } from '../../src';
import { Games } from '../../src/game/Game';

export const initOnGoingGamesRoute = () => {
    app.get('/api/ongoing-games', (req: Request, res: Response) => {
        res.json({ Games });
    });
};
