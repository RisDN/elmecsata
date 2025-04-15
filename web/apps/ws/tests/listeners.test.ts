import { Server } from 'socket.io';
import { createServer } from 'http';
import { registerSocketListeners } from '../../src/listeners';
import { io as clientIo, Socket as ClientSocket } from 'socket.io-client';
import { Games, addPlayer, removePlayer, setGameState, startGame } from '../../src/game/Game';
import { Game, Player, Quiz } from '@elmecsata/types';

describe('Socket Event Listeners', () => {
    let io: Server;
    let clientSocket: ClientSocket;
    let serverSocket: any;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = clientIo(`http://localhost:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
                registerSocketListeners(socket);
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test('should add player to game on join-game event', (done) => {
        const game: Game = {
            code: '123456',
            players: [],
            state: 'waiting',
            quiz: {} as Quiz,
            qrCode: '',
            answers: 0,
            currentQuestion: 0,
            hostId: 'host1',
        };
        Games.push(game);

        const player: Player = {
            id: 'player1',
            nickname: 'Player 1',
            points: 0,
            correctAnswers: 0,
        };

        clientSocket.emit('join-game', game.code, JSON.stringify(player));

        serverSocket.on('player-joined', (nickname, players) => {
            expect(nickname).toBe(player.nickname);
            expect(JSON.parse(players)).toEqual([player]);
            done();
        });
    });

    test('should remove player from game on disconnect', (done) => {
        const game: Game = {
            code: '123456',
            players: [
                {
                    id: 'player1',
                    nickname: 'Player 1',
                    points: 0,
                    correctAnswers: 0,
                },
            ],
            state: 'waiting',
            quiz: {} as Quiz,
            qrCode: '',
            answers: 0,
            currentQuestion: 0,
            hostId: 'host1',
        };
        Games.push(game);

        clientSocket.emit('disconnect');

        serverSocket.on('player-left', (nickname, players) => {
            expect(nickname).toBe('Player 1');
            expect(JSON.parse(players)).toEqual([]);
            done();
        });
    });

    test('should start game on start-game event', (done) => {
        const quiz: Quiz = {
            id: 1,
            name: 'Sample Quiz',
            questions: [],
        };

        clientSocket.emit('start-game', quiz.id.toString(), 'host1');

        serverSocket.on('start-game-callback', (game) => {
            const parsedGame = JSON.parse(game);
            expect(parsedGame.quiz).toEqual(quiz);
            expect(parsedGame.hostId).toBe('host1');
            done();
        });
    });

    test('should set game state to playing on start-play event', (done) => {
        const game: Game = {
            code: '123456',
            players: [],
            state: 'waiting',
            quiz: {} as Quiz,
            qrCode: '',
            answers: 0,
            currentQuestion: 0,
            hostId: 'host1',
        };
        Games.push(game);

        clientSocket.emit('start-play', game.code);

        serverSocket.on('start-countdown', () => {
            expect(setGameState(game.code, 'playing')?.state).toBe('playing');
            done();
        });
    });

    test('should kick player from game on kick-player event', (done) => {
        const game: Game = {
            code: '123456',
            players: [
                {
                    id: 'player1',
                    nickname: 'Player 1',
                    points: 0,
                    correctAnswers: 0,
                },
            ],
            state: 'waiting',
            quiz: {} as Quiz,
            qrCode: '',
            answers: 0,
            currentQuestion: 0,
            hostId: 'host1',
        };
        Games.push(game);

        clientSocket.emit('kick-player', 'player1', game.code);

        serverSocket.on('player-kicked', (nickname, players) => {
            expect(nickname).toBe('Player 1');
            expect(JSON.parse(players)).toEqual([]);
            done();
        });
    });
});
