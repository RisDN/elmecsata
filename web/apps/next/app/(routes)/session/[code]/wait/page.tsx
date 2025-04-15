import { WaitingRoom } from '@/app/(routes)/session/[code]/wait/waiting-room';
import getGame from '@/app/socket/get-game';
import isValidCode from '@/app/socket/is-valid-code';
import { ModeToggle } from '@/app/ToggleThemeButton';
import type { Game } from '@elmecsata/types';
import { redirect } from 'next/navigation';

interface WaitingPageProps {
    params: Promise<{ code: string }>;
}

const WaitingPage = async ({ params }: WaitingPageProps) => {
    const { code } = await params;

    const isValidCodeGiven = await isValidCode(code);

    if (!isValidCodeGiven) {
        return redirect('/join');
    }

    const game: Game = await getGame(code);

    if (!game) {
        return redirect('/join');
    }

    return (
        <>
            <WaitingRoom code={code} game={game} />
            <div className='absolute bottom-4 right-4 z-30'>
                <ModeToggle />
            </div>
        </>
    );
};

export default WaitingPage;
