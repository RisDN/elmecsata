import { Games, startGame, setGameState, addPlayer, removePlayer, playerAnswered, endQuestion, nextQuestion, timesUp, endGameLeaderboard, showCurrentLeaderboard, sortPlayers } from '../src/game/Game';
import { Game, Player, Quiz, Question } from '@elmecsata/types';
import { io } from '../src';
import { Socket } from 'socket.io';

jest.mock('../src', () => ({
    io: {
        to: jest.fn().mockReturnThis(),
        emit: jest.fn(),
    },
}));

describe('Game Logic', () => {
    let game: Game;
    let player: Player;
    let quiz: Quiz;

    beforeEach(() => {
        quiz = {
            id: 1,
            name: 'Sample Quiz',
            questions: [
                { id: 1, text: 'Question 1', duration: 10 },
                { id: 2, text: 'Question 2', duration: 10 },
            ],
        } as Quiz;

        game = {
            code: '123456',
            players: [],
            state: 'waiting',
            quiz,
            qrCode: 'sampleQRCode',
            answers: 0,
            currentQuestion: 0,
            hostId: 'host1',
        };

        player = {
            id: 'player1',
            nickname: 'Player 1',
            points: 0,
            correctAnswers: 0,
        };

        Games.push(game);
    });

    afterEach(() => {
        Games.length = 0;
        jest.clearAllMocks();
    });

    test('startGame should initialize a new game', async () => {
        const newGame = await startGame(quiz, 'host1');
        expect(newGame.code).toBeDefined();
        expect(newGame.players).toEqual([]);
        expect(newGame.state).toBe('waiting');
        expect(newGame.quiz).toEqual(quiz);
    });

    test('setGameState should update the game state', () => {
        setGameState(game.code, 'playing');
        expect(game.state).toBe('playing');
    });

    test('addPlayer should add a player to the game', () => {
        addPlayer(player, game.code, { join: jest.fn() } as unknown as Socket);
        expect(game.players).toContain(player);
    });

    test('removePlayer should remove a player from the game', () => {
        game.players.push(player);
        removePlayer({ id: player.id, leave: jest.fn() } as unknown as Socket);
        expect(game.players).not.toContain(player);
    });

    test('playerAnswered should update player points and correct answers', () => {
        game.players.push(player);
        playerAnswered(game, player, true, 10);
        expect(player.points).toBe(10);
        expect(player.correctAnswers).toBe(1);
    });

    test('endQuestion should reset answers and emit events', () => {
        game.players.push(player);
        endQuestion(game);
        expect(game.answers).toBe(0);
        expect(io.to).toHaveBeenCalledWith(game.code);
        expect(io.emit).toHaveBeenCalledWith('everyone-answered', game);
    });

    test('nextQuestion should increment current question and emit events', () => {
        game.players.push(player);
        nextQuestion(game);
        expect(game.currentQuestion).toBe(1);
        expect(io.to).toHaveBeenCalledWith(game.code);
        expect(io.emit).toHaveBeenCalledWith('next-question', game);
    });

    test('timesUp should call endQuestion', () => {
        const endQuestionSpy = jest.spyOn(global, 'endQuestion');
        timesUp(game);
        expect(endQuestionSpy).toHaveBeenCalledWith(game);
    });

    test('endGameLeaderboard should emit game-over event and remove game', () => {
        endGameLeaderboard(game);
        expect(io.to).toHaveBeenCalledWith(game.code);
        expect(io.emit).toHaveBeenCalledWith('game-over', game);
        expect(Games).not.toContain(game);
    });

    test('showCurrentLeaderboard should emit show-leaderboard event', () => {
        showCurrentLeaderboard(game);
        expect(io.to).toHaveBeenCalledWith(game.code);
        expect(io.emit).toHaveBeenCalledWith('show-leaderboard', game);
    });

    test('sortPlayers should sort players by points', () => {
        const player2: Player = { id: 'player2', nickname: 'Player 2', points: 20, correctAnswers: 0 };
        game.players.push(player, player2);
        sortPlayers(game);
        expect(game.players[0]).toBe(player2);
        expect(game.players[1]).toBe(player);
    });
});
