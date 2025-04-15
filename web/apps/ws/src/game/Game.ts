import { incrementQuizPlayed } from '@elmecsata/database';
import { Game, GameState, Player, Question, Quiz } from '@elmecsata/types';
import { toDataURL as QRCodeToDataURL } from 'qrcode';
import { Socket } from 'socket.io';
import { io } from '..';
import { generateCode } from '../util/generate-code';

export const Games: Game[] = [];
let timesUpTimer: NodeJS.Timer;

export const endQuestion = (game: Game) => {
    game.answers = 0;
    clearTimeout(timesUpTimer);
    sortPlayers(game);

    io.to(game.code).emit('everyone-answered', game);

    setTimeout(() => {
        showCurrentLeaderboard(game);
        setTimeout(() => {
            nextQuestion(game);
        }, 3000);
    }, 3000);
};

export const nextQuestion = (game: Game) => {
    console.log('Current question: ' + game.currentQuestion);
    if (game.currentQuestion < game.quiz.questions.length - 1) {
        game.currentQuestion++;
        io.to(game.code).emit('next-question', game);

        const nextQuestion: Question = game.quiz.questions[game.currentQuestion];
        timesUpTimer = setTimeout(() => {
            timesUp(game);
        }, nextQuestion.duration * 1000);

        return;
    }

    endGameLeaderboard(game);
};

export const sortPlayers = (game: Game) => {
    game.players.sort((a, b) => b.points - a.points);
};

export const showCurrentLeaderboard = (game: Game) => {
    sortPlayers(game);
    io.to(game.code).emit('show-leaderboard', game);
};

export const timesUp = (game: Game) => {
    console.log('Time is up!');
    endQuestion(game);
};

export const endGameLeaderboard = (game: Game) => {
    sortPlayers(game);
    io.to(game.code).emit('game-over', game);

    Games.splice(Games.indexOf(game), 1);
    console.log('[END GAME]: ' + game.code);
};

export const playerAnswered = (game: Game, player: Player, isCorrect: boolean, pointsEarned: number) => {
    player.points += pointsEarned;
    if (isCorrect) {
        player.correctAnswers++;
    }
    console.log(player.nickname + ' answered ' + (isCorrect ? 'correctly' : 'incorrectly'));
};

export const setGameState = (code: string, state: GameState): Game | undefined => {
    const game: Game | undefined = Games.find((game) => game.code === code);

    if (!game) {
        return undefined;
    }

    game.state = state;
    return game;
};

export const removePlayer = (socket: Socket): Game | undefined => {
    const playerId = socket.id;

    const game: Game | undefined = Games.find((game) => game.players.some((player) => player.id === playerId));

    if (!game) {
        return undefined;
    }
    const player: Player | undefined = game.players.find((player) => player.id === playerId);

    if (!player) {
        return undefined;
    }

    game.players = game.players.filter((player) => player.id !== playerId);
    socket.leave(game.code);
    io.to(game.code).emit('player-left', player.nickname, JSON.stringify(game.players));

    if (game.players.length === 0) {
        Games.splice(Games.indexOf(game), 1);
    }

    console.log(`[LEAVE]: ${socket.id} - total: ${io.engine.clientsCount - 1} ---> ${game.code}`);
    return game;
};

export const addPlayer = (player: Player, code: string, socket: Socket): Game | undefined => {
    const game: Game | undefined = Games.find((game) => game.code === code);

    if (!game) {
        return undefined;
    }

    socket.join(code);
    game.players.push(player);
    io.to(code).emit('player-joined', player.nickname, JSON.stringify(game.players));

    console.log('[JOIN]: ' + player.nickname + ' ---> ' + game.code);
    return game;
};

export const startGame = async (quiz: Quiz, hostId: string): Promise<Game> => {
    const code = generateCode();
    const qrCode = await QRCodeToDataURL(`https://elmecsata.hu/session/${code}`, {
        errorCorrectionLevel: 'H',
        type: 'image/webp',
        margin: 2,
        scale: 4,
        color: {
            dark: '#000000ff',
            light: '#ffffffff',
        },
    });

    const game: Game = {
        code: code.toString(),
        players: [],
        state: 'waiting',
        quiz,
        qrCode: qrCode,
        answers: 0,
        currentQuestion: 0,
        hostId,
    };

    console.log('[START GAME]: ' + quiz.name + ' ---> (' + game.code + ') by ' + hostId);

    Games.push(game);
    await incrementQuizPlayed(quiz.id);
    return game;
};
