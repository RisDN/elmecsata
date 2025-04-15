import request from 'supertest';
import { app } from '../../src';
import { Games } from '../../src/game/Game';
import { initGetGameRoute } from '../../api/get-game/route';
import { initOnGoingGamesRoute } from '../../api/ongoing-games/route';
import { initStartGameRoute } from '../../api/start-game/route';
import { initStartPlayRoute } from '../../api/start-play/route';
import { initValidCodeRoute } from '../../api/valid-code/route';

describe('API Routes', () => {
    beforeAll(() => {
        initGetGameRoute();
        initOnGoingGamesRoute();
        initStartGameRoute();
        initStartPlayRoute();
        initValidCodeRoute();
    });

    afterEach(() => {
        Games.length = 0;
    });

    describe('POST /api/get-game', () => {
        it('should return the game with the given code', async () => {
            const game = { code: '123456', players: [], state: 'waiting', quiz: {}, qrCode: '', answers: 0, currentQuestion: 0, hostId: 'host1' };
            Games.push(game);

            const response = await request(app).post('/api/get-game').send({ code: '123456' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(game);
        });

        it('should return undefined if the game is not found', async () => {
            const response = await request(app).post('/api/get-game').send({ code: '654321' });

            expect(response.status).toBe(200);
            expect(response.body).toBeUndefined();
        });
    });

    describe('GET /api/ongoing-games', () => {
        it('should return the list of ongoing games', async () => {
            const game = { code: '123456', players: [], state: 'waiting', quiz: {}, qrCode: '', answers: 0, currentQuestion: 0, hostId: 'host1' };
            Games.push(game);

            const response = await request(app).get('/api/ongoing-games');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ Games: [game] });
        });
    });

    describe('POST /api/start-game', () => {
        it('should start the game with the given code', async () => {
            const game = { code: '123456', players: [], state: 'waiting', quiz: {}, qrCode: '', answers: 0, currentQuestion: 0, hostId: 'host1' };
            Games.push(game);

            const response = await request(app).post('/api/start-game').send({ code: '123456' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ ...game, state: 'playing' });
        });

        it('should return an error if the game is not found', async () => {
            const response = await request(app).post('/api/start-game').send({ code: '654321' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ error: 'Game not found' });
        });
    });

    describe('GET /api/start-play', () => {
        it('should start the play for the first game', async () => {
            const game = { code: '123456', players: [], state: 'waiting', quiz: {}, qrCode: '', answers: 0, currentQuestion: 0, hostId: 'host1' };
            Games.push(game);

            const response = await request(app).get('/api/start-play');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ ...game, state: 'playing' });
        });
    });

    describe('POST /api/valid-code', () => {
        it('should return true if the code is valid', async () => {
            const game = { code: '123456', players: [], state: 'waiting', quiz: {}, qrCode: '', answers: 0, currentQuestion: 0, hostId: 'host1' };
            Games.push(game);

            const response = await request(app).post('/api/valid-code').send({ code: '123456' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ valid: true });
        });

        it('should return false if the code is not valid', async () => {
            const response = await request(app).post('/api/valid-code').send({ code: '654321' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ valid: false });
        });
    });
});
