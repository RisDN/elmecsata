'use client';

import { GameSession } from '@/app/(routes)/session/[code]/wait/game-session';
import type { Game, Player } from '@elmecsata/types';

interface GamePageProps {
    game: Game;
    isHost: boolean;
    currentPlayer: Player | null;
}

const GamePage = ({ game, isHost, currentPlayer }: GamePageProps) => {
    if (!isHost) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/10 to-background p-4'>
                <div className='absolute top-0 flex min-h-dvh w-screen select-none flex-col justify-center overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
                    {currentPlayer && <GameSession defaultGame={game} currentPlayer={currentPlayer} />}
                </div>
            </main>
        );
    }

    return (
        <div className='min-h-screen p-4'>
            <div className='mx-auto max-w-4xl'>
                {isHost && (
                    <div className='mb-6 rounded-lg border border-yellow-300 bg-yellow-100 p-4 dark:border-yellow-700 dark:bg-yellow-900/30'>
                        <div className='flex items-center gap-2'>
                            <span className='text-lg text-yellow-600 dark:text-yellow-400'>👑</span>
                            <h3 className='font-medium'>Házigazda mód</h3>
                        </div>
                        <p className='mt-1 text-sm text-muted-foreground'>
                            Házigazdaként csak megfigyelheted a játékot, nem válaszolhatsz a kérdésekre.
                        </p>
                    </div>
                )}

                <GameSession defaultGame={game} />
            </div>
        </div>
    );
};

export default GamePage;
