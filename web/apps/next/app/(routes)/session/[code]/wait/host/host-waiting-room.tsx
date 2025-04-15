'use client';

import ShaderLensBlurDemo from '@/app/components/ShaderLensBlur';
import { AvatarValues } from '@/app/components/avatar-selector';
import { GameStartAnimation } from '@/app/components/game-start-animation';
import { useToast } from '@/app/hooks/use-toast';
import { useSocket } from '@/app/providers/socket-provider';
import { container, scaleIn } from '@/lib/animations/sessionAnimations';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/card';
import { ScrollArea } from '@/lib/ui/scroll-area';
import type { Game, Player } from '@elmecsata/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, UserX } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HostWaitingRoomProps {
    game: Game;
}

export function HostWaitingRoom({ game }: HostWaitingRoomProps) {
    const { socket } = useSocket();
    const router = useRouter();
    const { toast } = useToast();
    const [players, setPlayers] = useState<Player[]>(game.players || []);
    const [isStarting, setIsStarting] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isCountingDown, setIsCountingDown] = useState(false);

    useEffect(() => {
        if (!socket) return;

        const handlePlayerJoined = (nickname: string, playersJson: string) => {
            const updatedPlayers = JSON.parse(playersJson) as Player[];
            setPlayers(updatedPlayers);
            toast({
                title: 'Player joined',
                description: `${nickname} has joined the game.`,
            });
        };

        const handlePlayerLeft = (nickname: string, playersJson: string) => {
            const updatedPlayers = JSON.parse(playersJson) as Player[];
            setPlayers(updatedPlayers);
            toast({
                title: 'Player left',
                description: `${nickname} has left the game.`,
            });
        };

        const handleGameStarted = (updatedGame: Game) => {
            setIsStarting(true);
            setTimeout(() => {
                router.push(`/session/${game.code}/wait?start=true&host=true`);
            }, 1000);
        };

        socket.on('player-joined', handlePlayerJoined);
        socket.on('player-left', handlePlayerLeft);
        socket.on('game-started', handleGameStarted);

        return () => {
            socket.off('player-joined', handlePlayerJoined);
            socket.off('player-left', handlePlayerLeft);
            socket.off('game-started', handleGameStarted);
        };
    }, [socket, game.code, router, toast]);

    const handleStartGame = () => {
        if (!socket) return;

        if (players.length < 1) {
            toast({
                title: 'Kevés játékos',
                description: 'Legalább 1 játékos szükséges a játék indításához.',
                variant: 'destructive',
            });
            return;
        }

        socket.emit('start-play', game.code);
        setIsStarting(true);
    };

    const handleCountdownComplete = () => {
        setTimeout(() => {
            setGameStarted(true);
        }, 2000);
    };

    const handleKickPlayer = (playerId: string, nickname: string) => {
        if (!socket) return;

        toast({
            title: 'Player kicked',
            description: `${nickname} has been removed from the game.`,
        });

        setPlayers(players.filter((p) => p.id !== playerId));
    };

    return (
        <div className='relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black'>
            <ShaderLensBlurDemo />
            <div className='relative z-10 h-full w-full max-w-7xl px-4 py-8'>
                {gameStarted && <GameStartAnimation />}

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    className='mb-16 flex flex-col items-center justify-center gap-2 align-middle'
                    variants={scaleIn}
                >
                    <div className='fixed top-0 flex flex-col sm:flex-row w-fit items-center justify-center gap-3 rounded-b-2xl bg-transparent/5 p-3 align-middle tracking-[5px] dark:bg-black/70'>
                        <div>
                            <h2 className='text-2xl font-thin'>Játék kód:</h2>
                            <h1 className='animate-pulse text-7xl'>{game.code}</h1>
                        </div>
                        <Image
                            src={game.qrCode || '/placeholder.svg'}
                            className='rounded-md dark:invert'
                            height={150}
                            width={150}
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
                                <div className='flex items-center justify-center gap-2'>
                                    <CardTitle className='text-center text-2xl'>Várakozás</CardTitle>
                                    <span className='flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-black'>
                                        <Crown size={12} />
                                        Házigazda
                                    </span>
                                </div>
                                {currentPlayer && (
                                    <CardDescription className='text-center'>
                                        Csatlakozva mint:{' '}
                                        <span className='font-bold text-black dark:text-white/70'>
                                            {currentPlayer.nickname}
                                        </span>
                                    </CardDescription>
                                )}
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-6'>
                                <AnimatePresence mode='wait'></AnimatePresence>

                                <ScrollArea className='h-[400px] rounded-md p-4'>
                                    <motion.div
                                        className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'
                                        variants={container}
                                        initial='hidden'
                                        animate='visible'
                                    >
                                        {currentPlayer && (
                                            <div className='relative flex flex-col items-center rounded-lg bg-primary/10 bg-gradient-to-tr from-white/70 from-30% to-primary/30 p-4 dark:from-black/70 dark:to-primary/30'>
                                                <div className='absolute right-2 top-2'>
                                                    <Crown className='text-yellow-500' size={20} />
                                                </div>
                                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500'>
                                                    <div className='h-12 w-12 overflow-hidden rounded-full'>
                                                        <Image
                                                            src={`/imgs/avatars/${AvatarValues[currentPlayer.avatarId]}.png`}
                                                            className='pointer-events-none'
                                                            width={255}
                                                            height={255}
                                                            alt={currentPlayer.avatarId.toString()}
                                                        />
                                                    </div>
                                                </div>
                                                <span className='mt-2 text-sm font-bold'>
                                                    {currentPlayer.nickname}{' '}
                                                    <span className='text-xs text-muted-foreground'>
                                                        (Te - Házigazda)
                                                    </span>
                                                </span>
                                            </div>
                                        )}
                                        <AnimatePresence>
                                            {players.map(
                                                (player) =>
                                                    player.id !== currentPlayer?.id && (
                                                        <motion.div
                                                            key={player.id}
                                                            className='animate-fade-in relative flex flex-col items-center rounded-lg bg-gradient-to-tr from-white/70 from-30% to-gray-500/30 p-4 dark:from-black/70 dark:to-gray-500/30'
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 20 }}
                                                        >
                                                            <Button
                                                                variant='ghost'
                                                                size='icon'
                                                                className='absolute right-2 top-2 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30'
                                                                onClick={() =>
                                                                    handleKickPlayer(player.id, player.nickname)
                                                                }
                                                            >
                                                                <UserX size={16} />
                                                            </Button>
                                                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-500'>
                                                                <div className='h-12 w-12 overflow-hidden rounded-full'>
                                                                    <Image
                                                                        src={`/imgs/avatars/${AvatarValues[player.avatarId]}.png`}
                                                                        className='pointer-events-none'
                                                                        width={255}
                                                                        height={255}
                                                                        alt={player.avatarId.toString()}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className='mt-2 text-sm font-medium'>
                                                                {player.nickname}
                                                            </span>
                                                        </motion.div>
                                                    )
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </ScrollArea>

                                {!isCountingDown && (
                                    <motion.div
                                        className='text-center'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <p className='text-muted-foreground'>Várakozás a többi játékosra...</p>
                                        <p className='mt-2 text-sm text-muted-foreground'>
                                            Házigazdaként te indíthatod el a játékot, és kirúghatod a játékosokat.
                                        </p>
                                    </motion.div>
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
