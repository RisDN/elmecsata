'use client';

import { cn } from '@/lib/utils';
import { UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../lib/ui/button';
import { Input } from '../../lib/ui/input';
import { Label } from '../../lib/ui/label';
import PasswordInput from '../../lib/ui/originui/password-input';
import { useEffect, useState } from 'react';
import { useAuthProvider } from '../providers/auth-provider';
import ImageUploadButton from '@/lib/ui/originui/image-upload-button';

interface Tab {
    value: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

export function LoginSignUpTabs() {
    const [activeTab, setActiveTab] = useState('signup');

    const { clearFields, setUsername, setPassword, setPasswordAgain, setAvatarFile, register, login } =
        useAuthProvider();

    useEffect(() => {
        clearFields();
    }, [activeTab]);

    const tabs: Tab[] = [
        {
            value: 'signup',
            label: 'Új vagyok itt.',
            icon: <UserPlus className='size-4' />,
            content: (
                <>
                    <form className='space-y-5'>
                        <div className='space-y-4'>
                            <div className='relative flex justify-center'>
                                <ImageUploadButton className='' onUpload={setAvatarFile} />
                            </div>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`-username`}>Felhasználónév</Label>
                                <Input
                                    onChange={(e) => setUsername(e.currentTarget.value)}
                                    id={`-username`}
                                    placeholder='Felhasználónév'
                                    type='text'
                                    required
                                />
                            </div>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`-password`}>Jelszó</Label>
                                <PasswordInput
                                    onPasswordChange={setPassword}
                                    onConfirmPasswordChange={setPasswordAgain}
                                />
                            </div>
                        </div>
                        <Button
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                register();
                            }}
                            className='w-full border border-primary bg-primary/30 font-semibold text-black transition-all hover:text-white dark:text-white'
                        >
                            Regisztráció
                        </Button>
                    </form>

                    <div className='my-1 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
                        <span className='text-xs text-muted-foreground'>Vagy</span>
                    </div>

                    <Button variant='ghost' className='w-full gap-2'>
                        <svg
                            role='img'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            className='size-4 fill-foreground text-foreground'
                        >
                            <title>Google</title>
                            <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
                        </svg>
                        Jelentkezz be Google fiókoddal
                    </Button>

                    <p className='mt-5 text-center text-xs text-muted-foreground'>
                        Bejelentkezéssel elfogadod az{' '}
                        <Link className='underline hover:no-underline' href='#'>
                            Általános Szerződési Feltételeket
                        </Link>
                        .
                    </p>
                </>
            ),
        },
        {
            value: 'signin',
            label: 'Van már fiókom!',
            icon: <Users className='size-4' />,
            content: (
                <>
                    <form className='space-y-5'>
                        <div className='space-y-4'>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`-username`}>Felhasználónév</Label>
                                <Input
                                    onChange={(e) => setUsername(e.currentTarget.value)}
                                    id={`-username`}
                                    placeholder='Írd be felhasználóneved'
                                    type='text'
                                    required
                                />
                            </div>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`-password`}>Jelszó</Label>
                                <Input
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    id={`-password`}
                                    placeholder='Írd be jelszavad'
                                    type='password'
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                            className='w-full border border-primary bg-primary/30 font-semibold text-black transition-all hover:text-white dark:text-white'
                        >
                            Bejelentkezés
                        </Button>
                    </form>

                    <div className='my-1 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
                        <span className='text-xs text-muted-foreground'>Vagy</span>
                    </div>

                    <Button variant='ghost' className='w-full gap-2'>
                        <svg
                            role='img'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            className='size-4 fill-foreground text-foreground'
                        >
                            <title>Google</title>
                            <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
                        </svg>
                        Jelentkezz be Google fiókoddal
                    </Button>

                    <p className='mt-5 text-center text-xs text-muted-foreground opacity-50'>
                        <Link href={'#'} className=''>
                            Elfelejtettem a bejelentkezési adataim.
                        </Link>
                    </p>

                    <p className='mt-3 text-center text-xs text-muted-foreground'>
                        Bejelentkezéssel elfogadod az{' '}
                        <Link className='underline hover:no-underline' href='#'>
                            Általános Szerződési Feltételeket
                        </Link>
                        .
                    </p>
                </>
            ),
        },
    ];

    return (
        <div className='w-full max-w-3xl space-y-6'>
            <div className='relative'>
                <div className='inline-flex h-10 w-full items-center rounded-lg bg-input/50 p-1'>
                    <div
                        className={cn(
                            'group relative inline-grid h-full w-full grid-cols-2 items-center gap-0 rounded-md bg-white/30 text-sm font-medium dark:bg-black/5',
                            'after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-background',
                            'after:shadow-sm after:shadow-black/5 after:outline-offset-2',
                            'after:transition-transform after:duration-300',
                            'after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                            'has-[:focus-visible]:after:outline-none has-[:focus-visible]:after:outline-2',
                            {
                                'after:translate-x-0': activeTab === 'signup',
                                'after:translate-x-full': activeTab === 'signin',
                            }
                        )}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    'relative z-[9] flex h-full items-center justify-center gap-2 border-none px-3 outline-none focus:outline-none focus:ring-0',
                                    'cursor-pointer whitespace-nowrap font-bold transition-colors',
                                    activeTab === tab.value
                                        ? 'text-foreground'
                                        : 'text-muted-foreground/70 hover:text-muted-foreground'
                                )}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className=''>
                {tabs.map((tab) => (
                    <div
                        key={tab.value}
                        className={cn(
                            'text-lg transition-opacity duration-300',
                            activeTab === tab.value ? 'opacity-100' : 'hidden opacity-0'
                        )}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
