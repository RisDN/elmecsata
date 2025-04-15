import { HostWaitingRoom } from './host-waiting-room';
import getGame from '@/app/socket/get-game';
import { redirect } from 'next/navigation';
import GamePage from '../game-page';
import { ModeToggle } from '@/app/ToggleThemeButton';

interface HostPageProps {
    params: Promise<{ code: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HostPage({ params, searchParams }: HostPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const { code } = resolvedParams;
    const start = resolvedSearchParams.start === 'true';


    const game = await getGame(code);

    if (!game) {
        return redirect('/join');
    }

    if (start) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <GamePage currentPlayer={null} game={game} isHost={true} />
            </div>
        );
    }

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <HostWaitingRoom game={game} />
            <div className='absolute bottom-4 right-4 z-30'>
                <ModeToggle />
            </div>
        </div>
    );
}
