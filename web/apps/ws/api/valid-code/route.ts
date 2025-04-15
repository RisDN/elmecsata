import { app } from '../../src';
import { Request, Response } from 'express';
import { Games } from '../../src/game/Game';

export const initValidCodeRoute = () => {
    app.post('/api/valid-code', (req: Request, res: Response) => {
        const { code } = req.body;
        const isValid: boolean = Games.map((game) => game.code).includes(code);

        // console.log(`[IS EXISTS]: ${code} -> ${isValid}`);

        res.json({ valid: isValid });
    });
};
