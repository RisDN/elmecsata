'use client';

import { fadeIn, scaleIn } from '@/lib/animations/sessionAnimations';
import { BottomGradient } from '@/lib/ui/bottom-gradient';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/card';
import InputLimited from '@/lib/ui/originui/input-limited';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useSocket } from '../providers/socket-provider';
import { AvatarSelector } from './avatar-selector';
import { redirect } from 'next/navigation';
import { Game, Player } from '@elmecsata/types';
import toast from 'react-hot-toast';
import getGame from '../socket/get-game';
import Link from 'next/link';
import { HouseIcon } from 'lucide-react';

interface JoinGameFormProps {
    code: string;
}

export function JoinGameForm({ code }: JoinGameFormProps) {
    const [nickname, setNickname] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const { id, socket } = useSocket();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const player: Player = {
            id: id || Math.random().toString(),
            nickname,
            avatarId: selectedAvatar,
            points: 0,
            correctAnswers: 0,
        };

        const game: Game = await getGame(code);

        if (!game) {
            setIsLoading(false);
            toast.error('Nem található játék!');
            return;
        }

        socket?.emit('join-game', code, JSON.stringify(player));
        localStorage.setItem('currentPlayer', JSON.stringify({ id, nickname, avatarId: selectedAvatar }));
        redirect(`/session/${code}/wait`);
    };

    return (
        <AnimatePresence mode='wait'>
            <motion.div key={'join-form'} variants={scaleIn} initial='hidden' animate='visible' exit='exit'>
                <Card className='w-full border-none bg-white/30 dark:bg-black/30'>
                    <CardHeader className='flex flex-row items-center justify-evenly gap-10 space-y-1 align-middle'>
                        <span></span>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <CardTitle className='text-center text-2xl'>Csatlakozás</CardTitle>
                            <CardDescription className='text-center text-black/70 dark:text-white/70'>
                                Válaszd ki a beceneved és az avatárodat!
                            </CardDescription>
                        </motion.div>
                        <Link href={'/'} className='text-sm text-gray-800 underline dark:text-white'>
                            <HouseIcon />
                        </Link>
                    </CardHeader>
                    <CardContent className='w-full'>
                        <motion.form
                            onSubmit={handleSubmit}
                            className='space-y-8'
                            variants={fadeIn}
                            initial='hidden'
                            animate='visible'
                        >
                            <motion.div
                                className='space-y-2'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <InputLimited
                                    label='Becenév:'
                                    minLength={2}
                                    maxLength={15}
                                    important
                                    placeholder='Beceneved'
                                    id='nickname'
                                    type='text'
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className='w-full'
                                />
                            </motion.div>

                            <motion.div
                                className='space-y-2'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className={'mb-2 text-sm font-bold dark:text-muted-foreground'}>Válassz avatárt:</p>
                                <div className='flex justify-center pt-2'>
                                    <AvatarSelector selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button
                                    type='submit'
                                    className='group/btn relative mb-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-black font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] sm:mb-0'
                                    disabled={!nickname || isLoading}
                                >
                                    {isLoading ? 'Csatlakozás...' : 'Tovább a várószobába'}
                                    <BottomGradient />
                                </Button>
                            </motion.div>
                        </motion.form>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
