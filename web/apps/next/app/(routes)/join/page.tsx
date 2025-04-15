'use client';

import ShaderLensBlurDemo from '@/app/components/ShaderLensBlur';
import isValidCode from '@/app/socket/is-valid-code';
import { ModeToggle } from '@/app/ToggleThemeButton';
import { Button } from '@/lib/ui/button';
import InputOTP from '@/lib/ui/originui/input-otp';
import { ClipboardIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const JoinPage = () => {
    const [gameCode, setGameCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (/^\d+$/.test(text) && text.length === 6) {
                setGameCode(text);
                toast.success(`Bemásolva! Csatlakozás folyamatban ezzel a kóddal: ${text}.`);
            } else {
                toast.error('A vágólap tartalma nem egy 6 jegyű szám!');
            }
        } catch (err) {
            toast.error('Nem sikerült beilleszteni a vágólap tartalmát!');
        }
    };

    const handleJoin = async () => {
        toast.remove();
        toast.loading('Csatlakozás...');
        setIsLoading(true);

        const isValidGameCode = await isValidCode(gameCode);

        toast.remove();
        if (!isValidGameCode) {
            setIsLoading(false);
            toast.error('Nem létező játék kód!');
            return;
        }

        redirect(`/session/${gameCode}`);
    };

    return (
        <div className='relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white dark:bg-black'>
            <ShaderLensBlurDemo />
            <Link href='/' className='group' prefetch={false}>
                <div className='fixed left-0 top-0 z-50 flex items-center gap-2 rounded-br-xl bg-white/50 px-4 py-2 backdrop-blur-sm dark:bg-black/30'>
                    <Image src='/imgs/logo.png' alt='ElmeCsata' width={40} height={40} />
                    <h1 className='hidden text-xl font-bold text-black dark:text-white sm:flex'>Elmecsata</h1>
                </div>
            </Link>

            <div className='absolute left-0 top-0 z-10 block size-full bg-white dark:bg-black sm:hidden'></div>
            <div className='relative z-10 w-full max-w-md px-4 py-8'>
                <div className='mb-8 text-center'>
                    <h1 className='mb-2 animate-bounce text-lg font-bold text-black dark:text-white sm:text-4xl'>
                        Csatlakozás
                    </h1>
                    <p className='text-sm text-black/60 dark:text-white/80 sm:text-lg'>
                        Írd be a 6 jegyű játék kódot amit a képernyőn látsz
                    </p>
                </div>

                <div className='mx-6 space-y-6 sm:mx-0'>
                    <div className='group relative flex items-center justify-center gap-2'>
                        <InputOTP
                            maxLength={6}
                            value={gameCode}
                            onChange={(value) => setGameCode(value)}
                            onComplete={(value) => {
                                setGameCode(value);
                                handleJoin();
                            }}
                        />

                        <Button
                            type='button'
                            className='ml-2 h-9 transform rounded-md border bg-white text-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/5 focus:outline-none dark:bg-transparent/5 sm:h-12'
                            onClick={handlePaste}
                        >
                            <ClipboardIcon className='size-5 text-black dark:text-white sm:size-6' />
                        </Button>
                    </div>

                    <Button
                        type='submit'
                        className='h-11 w-full transform rounded-xl border bg-white text-xl font-semibold text-black backdrop-blur-sm transition-all duration-300 hover:bg-white/5 focus:outline-none dark:bg-transparent/5 dark:text-white sm:h-14'
                        disabled={!gameCode || gameCode.length < 6 || isLoading}
                        onClick={handleJoin}
                    >
                        {isLoading ? (
                            <svg
                                className='mx-auto h-5 w-5 animate-spin text-black dark:text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                ></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                                ></path>
                            </svg>
                        ) : (
                            'Csatlakozás'
                        )}
                    </Button>
                </div>
            </div>
            <div className='absolute bottom-4 right-4 z-30'>
                <ModeToggle />
            </div>
        </div>
    );
};

export default JoinPage;
