import { JoinGameForm } from '@/app/components/join-game-form';
import ShaderLensBlurDemo from '@/app/components/ShaderLensBlur';
import isValidCode from '@/app/socket/is-valid-code';
import { redirect } from 'next/navigation';

interface SessionPageProps {
    params: Promise<{ code: string }>;
}

const SessionPage = async ({ params }: SessionPageProps) => {
    const { code } = await params;

    const isValidCodeGiven = await isValidCode(code);

    if (!isValidCodeGiven) {
        return redirect('/join');
    }

    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black'>
            <ShaderLensBlurDemo />
            <div className='absolute inset-0 z-10 h-screen w-screen backdrop-blur-xl'></div>

            <div className='relative z-10 w-full max-w-2xl px-4 py-8'>
                <JoinGameForm code={code} />
            </div>
        </div>
    );
};

export default SessionPage;
