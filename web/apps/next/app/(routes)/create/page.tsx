import { ModeToggle } from '@/app/ToggleThemeButton';
import { BackgroundBeams } from '@/lib/ui/background-beams';
import { getCountriesFormatted, getQuizTags } from '@elmecsata/database';
import { ContinentData, QuizTag } from '@elmecsata/types';
import { HouseIcon } from 'lucide-react';
import Link from 'next/link';
import CreateForm from './CreateForm';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

const CreatePage = async () => {
    const contientData: ContinentData[] = await getCountriesFormatted();
    const quizTags: QuizTag[] = await getQuizTags();

    const session = await auth();

    if (session === null || session.user === null) {
        return redirect('/?message=notloggedin');
    };

    return (
        <div className='absolute top-0 z-[-2] flex min-h-screen w-full select-none flex-col justify-center overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] px-3 dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
            <div className='z-0 hidden sm:block'>
                <BackgroundBeams className='z-0' />
            </div>
            <div className='relative z-10 mx-auto h-full w-full max-w-3xl rounded-3xl bg-white/30 backdrop-blur-sm dark:bg-black/30 sm:!h-fit sm:shadow-lg'>
                <div className='h-full sm:!h-fit sm:px-6 sm:py-8'>
                    <div className='flex items-center justify-between align-middle'>
                        <h1 className='mb-6 pt-6 text-center text-2xl font-bold text-gray-800 dark:text-white sm:text-left'>
                            Kvíz létrehozása
                        </h1>
                        <Link href={'/'} className='text-sm text-gray-800 underline dark:text-white'>
                            <HouseIcon />
                        </Link>
                    </div>
                    <CreateForm quizTags={quizTags} continentData={contientData} />
                </div>
            </div>
            <div className='absolute bottom-4 right-4 z-0'>
                <ModeToggle />
            </div>
        </div>
    );
};
export default CreatePage;
