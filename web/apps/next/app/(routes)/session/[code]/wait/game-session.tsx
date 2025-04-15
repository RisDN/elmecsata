'use client';

import { fadeIn, scaleIn } from '@/lib/animations/sessionAnimations';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';
import { Progress } from '@/lib/ui/progress';
import { getPlayerAvatar } from '@/lib/utils';
import type { AnswerEventProps, Game, Player, Question, QuestionOpnion } from '@elmecsata/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { socket } from '../../../../socket';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import ShapeIcon, { answerShapes } from '@/app/components/shape-icons';

interface GameSessionProps {
    defaultGame: Game;
    currentPlayer?: Player;
}

export function GameSession({ defaultGame, currentPlayer }: GameSessionProps) {
    const [gameState, setGameState] = useState<'question' | 'answer-review' | 'leaderboard' | 'final-results'>(
        'question'
    );

    const [game, setGame] = useState<Game>(defaultGame);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(game.currentQuestion);

    const [timeLeft, setTimeLeft] = useState(game.quiz.questions[currentQuestionIndex].duration);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

    const currentQuestion: Question = game.quiz.questions[currentQuestionIndex] as Question;

    const isHost = currentPlayer === undefined;

    const [players, setPlayers] = useState<Player[]>(game.players);

    const backToHome = () => {
        localStorage.removeItem('currentPlayer');
        localStorage.removeItem('hostedId');
        redirect('/');
    };

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('everyone-answered', (game: Game) => {
            console.log('Everyone answered! Moving to answer review');
            setGame(game);
            setPlayers(game.players);
            setGameState('answer-review');
        });

        socket.on('show-leaderboard', (game: Game) => {
            console.log('Showing leaderboard');
            setGame(game);
            setPlayers(game.players);
            setGameState('leaderboard');
        });

        socket.on('next-question', (game: Game) => {
            setSelectedAnswer(null);
            setShowCorrectAnswer(false);
            setTimeLeft(game.quiz.questions[game.currentQuestion].duration);
            setGameState('question');
            setCurrentQuestionIndex(game.currentQuestion);
            setHasAnswered(false);
        });

        socket.on('times-up', (game: Game) => {
            setGame(game);
            setPlayers(game.players);
            setGameState('answer-review');
            setSelectedAnswer(null);
            setShowCorrectAnswer(true);
        });

        socket.on('game-over', (game: Game) => {
            setGame(game);
            setPlayers(game.players);
            setGameState('final-results');
            setSelectedAnswer(null);
            setShowCorrectAnswer(false);
            setTimeLeft(0);
        });

        return () => {
            socket.off('everyone-answered');
            socket.off('game-over');
            socket.off('next-question');
            socket.off('show-leaderboard');
            socket.off('times-up');
        };
    }, [socket]);

    useEffect(() => {
        if (gameState === 'question' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [gameState, timeLeft]);
    const handleAnswerSelect = (answerId: string) => {
        if (isHost) {
            toast.error('Házigazdaként nem válaszolhatsz a kérdésekre!');
            return;
        }
        console.log('Answer selected', answerId);
        if (gameState === 'question' && !showCorrectAnswer && currentPlayer) {
            setSelectedAnswer(answerId);
            setShowCorrectAnswer(true);
            setHasAnswered(true);

            const selectedAnswerObj = currentQuestion.answers.find((a) => a.id === answerId) as QuestionOpnion;
            let pointsEarned = 0;
            if (selectedAnswerObj?.isCorrect) {
                pointsEarned = 1000 + timeLeft * 50;
            }

            const answerObject: AnswerEventProps = {
                playerId: currentPlayer.id,
                gameId: game.code,
                pointsEarned,
            };

            socket.emit('answer', answerObject);
        }
    };

    const getSortedPlayers = () => {
        const allPlayers = [...players];
        if (currentPlayer && !players.find((p) => p.id === currentPlayer.id)) {
            allPlayers.push(currentPlayer);
        }

        return allPlayers.sort((a, b) => b.points - a.points);
    };

    const renderQuestion = () => {
        if (!currentQuestion) return <div>Nincsenek kérdések</div>;

        return (
            <motion.div className='space-y-6' variants={fadeIn} initial='hidden' animate='visible'>
                <div className='flex items-center justify-between'>
                    <Badge variant='outline' className='px-4 py-2 text-lg'>
                        Kérdés {currentQuestionIndex + 1}/{game.quiz.questions.length}
                    </Badge>
                    <div className='flex items-center gap-2'>
                        <Clock className='h-5 w-5 text-primary' />
                        <span className='text-lg font-bold'>{timeLeft}s</span>
                    </div>
                </div>

                <Progress value={(timeLeft / currentQuestion.duration) * 100} className='h-2' />

                <Card className='border-none bg-white/50 shadow-lg backdrop-blur-sm dark:bg-black/50'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl'>{currentQuestion.title}</CardTitle>
                        {currentQuestion.content && (
                            <p className='text-center text-muted-foreground'>{currentQuestion.content}</p>
                        )}
                    </CardHeader>
                </Card>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <AnimatePresence>
                        {(currentQuestion.answers as QuestionOpnion[]).map((answer, index) => {
                            if (index >= 6) return null;

                            const isCorrect = answer.isCorrect;
                            const isSelected = selectedAnswer === answer.id;

                            return (
                                <motion.div
                                    key={answer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative overflow-hidden rounded-3xl border-2 ${isSelected ? 'border-transparent' : 'border-transparent'
                                        } ${showCorrectAnswer && isCorrect
                                            ? 'bg-green-500/50 dark:bg-green-500/50'
                                            : showCorrectAnswer && isSelected && !isCorrect
                                                ? 'bg-red-500/50 dark:bg-red-500/50'
                                                : ''
                                        } ${isHost ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                                    onClick={() => handleAnswerSelect(answer.id)}
                                >
                                    <div className={`flex h-24 items-center gap-4 p-4 ${answerShapes[index].color}`}>
                                        <div className='absolute inset-0 bg-white/80 dark:bg-black/80'></div>
                                        <div className='relative z-10 flex w-full items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <ShapeIcon
                                                    color={answerShapes[index].color}
                                                    shape={answerShapes[index].shape}
                                                />
                                                <span className='text-lg font-medium'>{answer.text}</span>
                                            </div>

                                            {showCorrectAnswer &&
                                                isCorrect &&
                                                currentQuestion.type !== 'poll' &&
                                                currentQuestion.type !== 'slide' && (
                                                    <Badge className='bg-green-500'>Helyes!</Badge>
                                                )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    };

    const renderAnswerReview = () => {
        const correctAnswer = currentQuestion.answers.find((a) => (a as QuestionOpnion).isCorrect) as QuestionOpnion;
        return (
            <motion.div variants={scaleIn} initial='hidden' animate='visible'>
                <Card className='border-none bg-white/50 shadow-lg backdrop-blur-sm dark:bg-black/50'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl'>{currentQuestion.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='mb-4 text-center'>
                            <Badge className='border-green-500 bg-green-500/30 px-4 py-2 text-lg text-white hover:bg-green-500/30'>
                                Helyes válasz: {correctAnswer?.text}
                            </Badge>
                        </div>

                        {selectedAnswer && (
                            <div className='text-center'>
                                {selectedAnswer === correctAnswer?.id ? (
                                    <p className='text-lg font-bold text-green-500'>
                                        Eltaláltad! +{1000 + timeLeft * 50} pont
                                    </p>
                                ) : (
                                    <p className='text-lg font-bold text-red-500'>Elhibáztad!</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    const renderLeaderboard = () => {
        const sortedPlayers = getSortedPlayers();

        return (
            <motion.div variants={scaleIn} initial='hidden' animate='visible'>
                <Card className='border-none bg-white/50 shadow-lg backdrop-blur-sm dark:bg-black/50'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl'>Eredménytábla</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {sortedPlayers.map((player, index) => (
                                <div
                                    key={player.id}
                                    className={`flex items-center justify-between rounded-lg p-4 ${index === 0
                                            ? 'border border-yellow-300 bg-yellow-500/30 dark:bg-yellow-500/30'
                                            : index === 1
                                                ? 'border border-gray-500 bg-gray-500/30 dark:bg-gray-500/30'
                                                : index === 2
                                                    ? 'border border-amber-600 bg-amber-600/30 dark:bg-amber-600/30'
                                                    : 'bg-card'
                                        } ${player.id === currentPlayer?.id ? '' : ''}`}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 flex-shrink-0 text-center font-bold'>{index + 1}</div>
                                        <div className='flex size-10 items-center justify-center rounded-full bg-primary/20'>
                                            <Image
                                                className='size-10 rounded-full'
                                                width={255}
                                                height={255}
                                                src={getPlayerAvatar(player.avatarId) || '/placeholder.svg'}
                                                alt='Avatar'
                                            />
                                        </div>
                                        <span className='font-medium'>
                                            {player.nickname} {player.id === currentPlayer?.id && '(Te)'}
                                        </span>
                                    </div>
                                    <div className='text-lg font-bold'>{player.points || 0} pont</div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-6 flex justify-center'>
                            <div className='text-center text-sm text-muted-foreground'>
                                Következő kérdés pár másodperc múlva
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    const renderFinalResults = () => {
        const winner: Player = players[0];

        return (
            <motion.div variants={scaleIn} initial='hidden' animate='visible'>
                <Card className='border-none bg-white/50 shadow-lg backdrop-blur-sm dark:bg-black/50'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl'>Végeredmény</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='mb-12 mt-4'>
                            <div className='relative h-64 w-full'>
                                <div className='absolute bottom-0 left-1/4 flex w-1/4 -translate-x-1/2 transform flex-col items-center'>
                                    {players[1] && (
                                        <motion.div
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className='flex flex-col items-center'
                                        >
                                            <div
                                                className={`flex h-16 w-16 items-center justify-center rounded-full ${players[1].id === currentPlayer?.id
                                                        ? 'bg-primary ring-2 ring-white'
                                                        : 'bg-gray-300 dark:bg-gray-700'
                                                    }`}
                                            >
                                                <Image
                                                    className='size-16 rounded-full'
                                                    width={255}
                                                    height={255}
                                                    src={getPlayerAvatar(players[1].avatarId) || '/placeholder.svg'}
                                                    alt={players[1].avatarId.toString()}
                                                />
                                            </div>
                                            <p className='mt-2 text-center font-bold'>
                                                {players[1].nickname}
                                                {players[1].id === currentPlayer?.id && (
                                                    <span className='block text-xs'>(Te)</span>
                                                )}
                                            </p>
                                            <p className='text-sm font-medium'>{players[1].points || 0} pont</p>
                                        </motion.div>
                                    )}
                                    <div className='mt-auto flex h-24 w-full items-center justify-center rounded-t-lg bg-gray-300 dark:bg-gray-700'>
                                        <span className='text-2xl font-bold'>2</span>
                                    </div>
                                </div>

                                <div className='absolute bottom-0 left-1/2 flex w-1/4 -translate-x-1/2 transform flex-col items-center'>
                                    {players[0] && (
                                        <motion.div
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1, duration: 0.5 }}
                                            className='flex flex-col items-center'
                                        >
                                            <div
                                                className={`flex h-20 w-20 items-center justify-center rounded-full ${players[0].id === currentPlayer?.id
                                                        ? 'bg-primary ring-2 ring-white'
                                                        : 'bg-yellow-500'
                                                    }`}
                                            >
                                                <Image
                                                    className='size-20 rounded-full'
                                                    width={255}
                                                    height={255}
                                                    src={getPlayerAvatar(players[0].avatarId) || '/placeholder.svg'}
                                                    alt={players[1].avatarId.toString()}
                                                />
                                            </div>
                                            <p className='mt-2 text-center font-bold'>
                                                {players[0].nickname}
                                                {players[0].id === currentPlayer?.id && (
                                                    <span className='block text-xs'>(Te)</span>
                                                )}
                                            </p>
                                            <p className='text-sm font-medium'>{players[0].points || 0} pont</p>
                                        </motion.div>
                                    )}
                                    <div className='mt-auto flex h-32 w-full items-center justify-center rounded-t-lg bg-yellow-500'>
                                        <span className='text-2xl font-bold'>1</span>
                                    </div>
                                </div>
                                <div className='absolute bottom-0 left-3/4 flex w-1/4 -translate-x-1/2 transform flex-col items-center'>
                                    {players[2] && (
                                        <motion.div
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                            className='flex flex-col items-center'
                                        >
                                            <div
                                                className={`flex h-16 w-16 items-center justify-center rounded-full ${players[2].id === currentPlayer?.id
                                                        ? 'bg-primary ring-2 ring-white'
                                                        : 'bg-amber-700 dark:bg-amber-800'
                                                    }`}
                                            >
                                                <Image
                                                    className='size-16 rounded-full'
                                                    width={255}
                                                    height={255}
                                                    src={getPlayerAvatar(players[2].avatarId) || '/placeholder.svg'}
                                                    alt={players[1].avatarId.toString()}
                                                />
                                            </div>
                                            <p className='mt-2 text-center font-bold'>
                                                {players[2].nickname}
                                                {players[2].id === currentPlayer?.id && (
                                                    <span className='block text-xs'>(Te)</span>
                                                )}
                                            </p>
                                            <p className='text-sm font-medium'>{players[2].points || 0} pont</p>
                                        </motion.div>
                                    )}
                                    <div className='mt-auto flex h-16 w-full items-center justify-center rounded-t-lg bg-amber-700 dark:bg-amber-800'>
                                        <span className='text-2xl font-bold'>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {winner?.id === currentPlayer?.id && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className='mb-8 text-center'
                            >
                                <p className='text-xl font-bold text-green-500'>Gratulálok! Nyertél!</p>
                            </motion.div>
                        )}

                        <h3 className='mb-4 text-xl font-bold'>Végső eredménytábla</h3>
                        <div className='space-y-4'>
                            {players.map((player, index) => (
                                <div
                                    key={player.id}
                                    className={`flex items-center justify-between rounded-lg p-4 ${index === 0
                                            ? 'border border-yellow-300 bg-yellow-500/30 dark:bg-yellow-500/30'
                                            : index === 1
                                                ? 'border border-gray-500 bg-gray-500/30 dark:bg-gray-500/30'
                                                : index === 2
                                                    ? 'border border-amber-600 bg-amber-600/30 dark:bg-amber-600/30'
                                                    : 'bg-card'
                                        } ${player.id === currentPlayer?.id ? '' : ''}`}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 flex-shrink-0 text-center font-bold'>{index + 1}</div>
                                        <div className='flex size-10 items-center justify-center rounded-full bg-primary/20'>
                                            <Image
                                                className='size-10 rounded-full'
                                                width={255}
                                                height={255}
                                                src={getPlayerAvatar(player.avatarId) || '/placeholder.svg'}
                                                alt='Avatar'
                                            />
                                        </div>
                                        <span className='font-medium'>
                                            {player.nickname} {player.id === currentPlayer?.id && '(Te)'}
                                        </span>
                                    </div>
                                    <div className='text-lg font-bold'>{player.points || 0} pont</div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-8 flex justify-center'>
                            <Button onClick={() => backToHome()} className='px-8'>
                                Vissza a főoldalra
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    const handleAnswerClick = (answerId: string) => {
        if (isHost) {
            toast.error('Házigazdaként nem válaszolhatsz a kérdésekre!');
            return;
        }

        handleAnswerSelect(answerId);
    };

    return (
        <div className='container mx-auto max-w-7xl px-4 py-8'>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold'>{game.quiz.name}</h1>
                {game.quiz.description && <p className='text-muted-foreground'>{game.quiz.description}</p>}
            </div>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={gameState}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {gameState === 'question' && renderQuestion()}
                    {gameState === 'answer-review' && renderAnswerReview()}
                    {gameState === 'leaderboard' && renderLeaderboard()}
                    {gameState === 'final-results' && renderFinalResults()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
