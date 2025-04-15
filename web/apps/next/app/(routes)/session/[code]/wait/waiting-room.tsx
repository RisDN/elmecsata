/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { container, scaleIn } from '@/lib/animations/sessionAnimations';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/card';
import SendEmoteModal, { emotes } from '@/lib/ui/originui/send-emote-modal';
import { ScrollArea } from '@/lib/ui/scroll-area';
import type { Game, Player } from '@elmecsata/types';
import { AnimatePresence, motion } from 'framer-motion';
import { BabyIcon, Crown, Play, SmileIcon, StopCircle, Trash2Icon, UsersRound, UserX } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AvatarValues } from '../../../../components/avatar-selector';
import { CountdownTimer } from '../../../../components/countdown-timer';
import { GameStartAnimation } from '../../../../components/game-start-animation';
import PlayerEmoteDisplay from '../../../../components/player-emote-display';
import ShaderLensBlurDemo from '../../../../components/ShaderLensBlur';
import { useSocket } from '../../../../providers/socket-provider';
import GamePage from './game-page';

interface WaitingRoomProps {
    code: string;
    game: Game;
}

export function WaitingRoom({ code, game }: WaitingRoomProps) {
    const [players, setPlayers] = useState<Player[]>(game.players);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [isHost, setIsHost] = useState<boolean>(false);
    const [playerEmotes, setPlayerEmotes] = useState<{ [playerId: string]: { emoteIndex: number; timestamp: number } }>(
        {},
    );

    const { socket } = useSocket();

    useEffect(() => {
        const hostedId = localStorage.getItem('hostedId');

        if (hostedId === game.hostId) {
            setIsHost(true);
            setCurrentPlayer(null);
            return;
        }

        const playerData = localStorage.getItem('currentPlayer');
        if (!playerData && !isHost) {
            console.log('Player not found 1');
            redirect(`/session/${code}`);
        }

        const player: Player = JSON.parse(playerData!);

        if (!player && !isHost) {
            console.log('Player not found 2');
            redirect(`/session/${code}`);
        }

        if (!game.players.find((p) => p.id === player.id)) {
            return redirect(`/session/${code}`);
        }

        setCurrentPlayer(player);
    }, []);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('player-joined', (username: string, newPlayerList: string) => {
            toast.success(`${username} csatlakozott a játékhoz!`, {
                duration: 5000,
            });
            setPlayers(JSON.parse(newPlayerList));
        });

        socket.on('player-left', (username: string, newPlayerList: string) => {
            toast.error(`${username} elhagyta a játékot!`, {
                duration: 5000,
            });
            setPlayers(JSON.parse(newPlayerList));
        });

        socket.on('start-countdown', () => {
            toast.success('A játék hamarosan indul!', {
                duration: 5000,
            });
            setIsCountingDown(true);
        });

        socket.on('emote-cooldown', (remainingSeconds: number) => {
            toast.remove();
            toast.error(`Lassabban öcsisajt! Várj még ${remainingSeconds} másodpercet!`, {
                duration: 5000,
            });
        });

        socket.on('player-kicked', (nickname: string, newPlayerList: string) => {
            handleKickPlayer(nickname, newPlayerList);
        });

        socket.on('player-not-found', () => {
            toast.error('A kiválasztott játékos nem található!', {
            });
        });

        socket.on('game-stopped', () => {
            toast.error('A házigazda elhagyta a játékot, a játék véget ért!', {
                duration: 3000,
            });
            localStorage.removeItem('currentPlayer');
            localStorage.removeItem('hostedId');
            setTimeout(() => {
                redirect('/join');
            }, 3000);
        });

        socket.on('emote-sent', (username: string, emoteIndex: number, playerId: string) => {
            console.log(`Emote received from server: ${username}, ${emoteIndex}, ${playerId}`);

            if (!currentPlayer || playerId !== currentPlayer.id) {
                setPlayerEmotes((prev) => ({
                    ...prev,
                    [playerId]: { emoteIndex, timestamp: Date.now() },
                }));

                setTimeout(() => {
                    setPlayerEmotes((prev) => {
                        const newEmotes = { ...prev };
                        delete newEmotes[playerId];
                        return newEmotes;
                    });
                }, 3000);
            }

            toast.success(`${username} egy emojit küldött!`, {
                duration: 3000,
            });
        });

        return () => {
            socket.off('player-joined');
            socket.off('player-left');
            socket.off('start-countdown');
            socket.off('emote-cooldown');
            socket.off('emote-sent');
            socket.off('game-stopped');
            socket.off('player-kicked');
            socket.off('player-not-found');
        };
    }, [socket]);

    const handleCountdownComplete = () => {
        setTimeout(() => {
            setGameStarted(true);
        }, 2000);
    };

    const handleKickPlayer = (nickname: string, newPlayerList: string) => {

        toast.error(`${nickname} ki lett rúgva a játékból!`, {
            duration: 5000,
        });

        const savedData = localStorage.getItem('currentPlayer');
        const currentPlayer = savedData ? JSON.parse(savedData) : null;

        if (nickname === currentPlayer?.nickname) {
            localStorage.removeItem('currentPlayer');
            redirect('/');
        };

        setPlayers(JSON.parse(newPlayerList));
    };

    const sendEmote = (index: number) => {
        if (!currentPlayer || !socket) return;

        console.log(`Sending emote: ${index} for player ${currentPlayer.id}`);

        setPlayerEmotes((prev) => ({
            ...prev,
            [currentPlayer.id]: { emoteIndex: index, timestamp: Date.now() },
        }));

        setTimeout(() => {
            setPlayerEmotes((prev) => {
                const newEmotes = { ...prev };
                delete newEmotes[currentPlayer.id];
                return newEmotes;
            });
        }, 3000);

        socket.emit('send-emote', index, JSON.stringify(currentPlayer), code, currentPlayer.id);
    };

    const handleGameStart = () => {
        if (players.length <= 1 || !players) {
            toast.error('A játékhoz legalább 2 játékos szükséges!');
            return;
        }
        socket?.emit('start-play', game.code);
    };

    const kickPlayer = (playerId: string) => {
        if (!socket) return;
        socket.emit('kick-player', playerId, code);
    }

    if (gameStarted) {
        return <GamePage game={game} isHost={isHost} currentPlayer={isHost ? null : currentPlayer} />;
    }

    // useEffect(() => {
    //     window.addEventListener('beforeunload', () => {
    //         if (!isHost) {
    //             return;
    //         }
    //         socket?.emit('stop-game', code);
    //     });
    // }, []);

    const stopGame = () => {
        if (!socket) return;
        if (!isHost) return;
        localStorage.removeItem('currentPlayer');
        localStorage.removeItem('hostedId');
        socket?.emit('stop-game', code);
        redirect('/');
    }

    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black'>
            <ShaderLensBlurDemo />
            <div className='relative z-10 h-full w-full max-w-7xl px-4 py-2 sm:py-8'>
                {gameStarted && <GameStartAnimation />}

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    className='mb-16 flex flex-col items-center justify-center gap-2 align-middle'
                    variants={scaleIn}
                >
                    <div className='sm:fixed top-0 flex flex-col sm:flex-row w-fit items-center justify-center gap-3 rounded-b-2xl sm:bg-transparent/5 sm:p-3 align-middle tracking-[5px] sm:dark:bg-black/70'>
                        <div>
                            <h2 className='text-2xl font-thin'>Játék kód:</h2>
                            <h1 className='animate-pulse text-7xl'>{game.code}</h1>
                        </div>
                        <Image
                            src={game.qrCode || '/placeholder.svg'}
                            className='rounded-md dark:invert w-full h-full'
                            height={148}
                            width={148}
                            alt={game.code}
                        />
                    </div>
                </motion.div>

                <motion.div
                    variants={scaleIn}
                    initial='hidden'
                    animate='visible'
                    className='flex h-full w-full items-center justify-center'
                >
                    <Card className='h-full w-full !border-none !bg-transparent shadow-none'>
                        <CardHeader>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.2 }}
                            >
                                {!isHost && <CardTitle className='text-center text-2xl'>Várakozás</CardTitle>}
                                {currentPlayer && !isHost && (
                                    <CardDescription className='text-center'>
                                        Csatlakozva mint:{' '}
                                        <span className='font-bold text-black dark:text-white/70'>
                                            {currentPlayer.nickname}
                                        </span>
                                    </CardDescription>
                                )}
                                {isHost && (
                                    <div className='flex items-center justify-center gap-2'>
                                        <CardTitle className='text-center text-2xl'>Várakozás</CardTitle>
                                        <span className='flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-black'>
                                            <Crown size={12} />
                                            Házigazda
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-6'>
                                <AnimatePresence mode='wait'>
                                    {isCountingDown ? (
                                        <motion.div
                                            className='py-8'
                                            key={'countdown'}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <CountdownTimer seconds={5} onComplete={handleCountdownComplete} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className='flex w-full justify-end gap-2 pr-4 text-lg font-medium'
                                            key={'players-count'}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            exit={{ opacity: 0, y: 20 }}
                                        >
                                            <UsersRound /> {players.length}
                                        </motion.div>
                                    )}
                                    {isHost && !isCountingDown && (
                                        <div className='flex justify-between items-center align-middle'>
                                            <Button
                                                onClick={() => handleGameStart()}
                                                className='sm:flex items-center gap-2 border border-green-500 bg-green-500/30 text-black hover:bg-green-500 hover:text-white dark:text-white hidden'
                                                size='lg'
                                            >
                                                <Play size={18} />
                                                Indítás
                                            </Button>
                                            <Button
                                                onClick={() => stopGame()}
                                                className='sm:flex items-center gap-2 border border-red-500 bg-red-500/30 text-black hover:bg-red-500 hover:text-white dark:text-white hidden'
                                                size='lg'
                                            >
                                                <StopCircle size={18} />
                                                Megszakítás
                                            </Button>
                                        </div>
                                    )}
                                </AnimatePresence>

                                <ScrollArea className='h-[400px] rounded-md py-2 sm:p-4'>
                                    <motion.div
                                        className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'
                                        variants={container}
                                        initial='hidden'
                                        animate='visible'
                                    >
                                        {currentPlayer && (
                                            <div className='flex flex-col items-center rounded-lg bg-primary/10 bg-gradient-to-tr from-white/70 from-30% to-primary/30 p-4 dark:from-black/70 dark:to-primary/30'>
                                                <SendEmoteModal sendEmote={sendEmote}>
                                                    <div className='absolute left-5 top-5 transform cursor-pointer transition-transform duration-200 hover:scale-110'>
                                                        <SmileIcon />
                                                    </div>
                                                </SendEmoteModal>

                                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500'>
                                                    <div className='h-12 w-12 overflow-hidden rounded-full relative'>
                                                        <Image
                                                            src={`/imgs/avatars/${AvatarValues[currentPlayer.avatarId]}.png`}
                                                            className='pointer-events-none'
                                                            width={255}
                                                            height={255}
                                                            alt={currentPlayer.avatarId.toString()}
                                                        />
                                                        <PlayerEmoteDisplay
                                                            emote={
                                                                playerEmotes[currentPlayer.id] ? emotes[playerEmotes[currentPlayer.id].emoteIndex] : null
                                                            }
                                                            isVisible={!!playerEmotes[currentPlayer.id]}
                                                        />
                                                    </div>
                                                </div>
                                                <span className='mt-2 text-sm font-bold'>
                                                    {currentPlayer.nickname}{' '}
                                                    <span className='text-xs text-muted-foreground'>(Te)</span>
                                                </span>
                                            </div>
                                        )}
                                        <AnimatePresence>
                                            {players.length === 0 && (
                                                <motion.div className=''>
                                                    <span className='text-sm font-medium text-muted-foreground'>
                                                        Jelenleg nincs csatlakozott játékos... 😢
                                                    </span>
                                                </motion.div>
                                            )}
                                            {players.map(
                                                (player) =>
                                                    player.id !== currentPlayer?.id && (
                                                        <motion.div
                                                            key={player.id}
                                                            className='relative animate-fade-in flex flex-col items-center rounded-lg bg-gradient-to-tr from-white/70 from-30% to-gray-500/30 p-4 dark:from-black/70 dark:to-gray-500/30'
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 20 }}
                                                        >
                                                            {isHost && (
                                                                <div onClick={() => kickPlayer(player.id)} className='absolute right-3 top-3 transform cursor-pointer transition-transform duration-200 hover:scale-110'>
                                                                    <UserX className='text-red-600 size-5' />
                                                                </div>
                                                            )}
                                                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500'>
                                                                <div className='h-12 w-12 overflow-hidden rounded-full relative'>
                                                                    <Image
                                                                        src={`/imgs/avatars/${AvatarValues[player.avatarId]}.png`}
                                                                        className='pointer-events-none'
                                                                        width={255}
                                                                        height={255}
                                                                        alt={player.avatarId.toString()}
                                                                    />
                                                                    <PlayerEmoteDisplay
                                                                        emote={playerEmotes[player.id] ? emotes[playerEmotes[player.id].emoteIndex] : null}
                                                                        isVisible={!!playerEmotes[player.id]}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className='mt-2 text-sm font-medium'>
                                                                {player.nickname}
                                                            </span>
                                                        </motion.div>
                                                    ),
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </ScrollArea>

                                {isHost && !isCountingDown && (
                                    <Button
                                        onClick={() => handleGameStart()}
                                        className='flex w-full rounded-xl items-center gap-2 border border-green-500 bg-green-500/30 text-black hover:bg-green-500 hover:text-white dark:text-white sm:hidden'
                                        size='lg'
                                    >
                                        <Play size={18} />
                                        Játék indítása
                                    </Button>
                                )}

                                {!isCountingDown && (
                                    <motion.p
                                        className='text-center text-muted-foreground'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Várakozás a többi játékosra...
                                    </motion.p>
                                )}
                                {isCountingDown && (
                                    <motion.p
                                        className='text-center text-muted-foreground'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Visszaszámlálás a játék kezdetéig...
                                    </motion.p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}