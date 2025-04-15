import { Quiz } from './quiz';

export interface Player {
    id: string;
    nickname: string;
    avatarId: number;
    points: number;
    correctAnswers: number;
}

export interface Game {
    hostId: string | undefined;
    players: Player[];
    quiz: Quiz;
    code: string;
    state: GameState;
    qrCode: string;
    currentQuestion: number;
    answers: number;
}

export interface AnswerEventProps {
    playerId: string;
    gameId: string;
    pointsEarned: number;
}

export type GameState = 'waiting' | 'playing';
