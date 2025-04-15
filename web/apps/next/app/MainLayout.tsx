import { Avatar } from '@/lib/ui/avatar';
import { Button } from '@/lib/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/lib/ui/dropdown-menu';
import ShinyButton from '@/lib/ui/magicui/shiny-button';
import SignModal from '@/lib/ui/originui/sign-modal';
import { Sheet } from '@/lib/ui/sheet';
import { getImageUrl } from '@/lib/utils';
import { DropdownMenuGroup, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { BoltIcon, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from './auth';
import SignOutButton from './components/sign-out-button';
import ScrollTop from './ScrollTop';
import { ModeToggle } from './ThemeButton';
import { Quiz } from '@elmecsata/types';

const MainLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();
    return (
        <>
            <header className='flex h-20 w-full shrink-0 items-center justify-between border-b border-zinc-50 bg-white/20 px-4 backdrop-blur-sm dark:border-zinc-900 dark:bg-black/20 md:px-6'>
                <Link href='/' className='group' prefetch={false}>
                    <div className='flex items-center gap-2'>
                        <Image src='/imgs/logo.png' className='' alt='ElmeCsata' width={40} height={40} />
                        <h1 className='hidden text-xl font-bold text-black dark:text-white sm:flex'>Elmecsata</h1>
                    </div>
                </Link>
                <Sheet>
                    <div className='flex items-center justify-center'>
                        <div className='flex items-center gap-2'>
                            <ModeToggle />
                            {session && session.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            className='group rounded-full bg-black/15 transition-all dark:bg-black/30'
                                        >
                                            <Avatar className='cursor-pointer border-2 transition-all hover:border-primary/50'>
                                                <div className='group flex w-full items-center justify-center bg-black/15 hover:bg-black dark:bg-black/30'>
                                                    <Image
                                                        src={getImageUrl(session.user.avatar)}
                                                        alt='Profile picture'
                                                        width={128}
                                                        height={128}
                                                        className='z-10 flex size-full items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-3xl dark:bg-primary/10'
                                                    />
                                                </div>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-full max-w-96 !p-2'>
                                        <DropdownMenuLabel className='flex min-w-0 flex-col'>
                                            <span className='truncate text-sm font-semibold text-white'>
                                                {session.user.username}
                                            </span>
                                            <span className='truncate text-xs font-normal text-white/70'>
                                                {session.user.email}
                                            </span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={'/profile'}>
                                                <DropdownMenuItem>
                                                    <BoltIcon
                                                        size={16}
                                                        className='mr-2 opacity-60'
                                                        aria-hidden='true'
                                                    />
                                                    <span>Profilom és kvízeim</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        {session.user.quizzes.length > 0 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel className='mb-2 truncate text-sm font-medium text-zinc-500'>
                                                    Gyors szerkesztés
                                                </DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    {session.user.quizzes.map((quiz: Quiz) => (
                                                        <Link href={'/edit/' + quiz.id} key={quiz.id}>
                                                            <DropdownMenuItem>
                                                                <div className='flex h-fit items-center gap-2'>
                                                                    <Image
                                                                        src={getImageUrl(quiz.icon)}
                                                                        alt={quiz.name}
                                                                        width={32}
                                                                        height={32}
                                                                        className='size-6 rounded-full bg-black/15 dark:bg-black/30'
                                                                    />
                                                                    <span>{quiz.name}</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </Link>
                                                    ))}
                                                </DropdownMenuGroup>
                                            </>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <SignOutButton />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <SignModal>
                                    <Avatar className='cursor-pointer border-2 transition-all hover:border-primary/50'>
                                        <div className='group bg-black/15 hover:bg-black dark:bg-black/30'>
                                            <UserRound className='size-full p-2 text-black opacity-80 group-hover:invert dark:text-white group-hover:dark:invert-0' />
                                        </div>
                                    </Avatar>
                                </SignModal>
                            )}

                            <Link href={'/create'}>
                                <ShinyButton
                                    text='Létrehozás!'
                                    className='bg-primary/15 font-bold text-black dark:bg-primary/30'
                                />
                            </Link>
                        </div>
                    </div>
                </Sheet>
            </header>
            <main className=''>{children}</main>
            <div className='flex items-center justify-center'>{/* <ScrollTop /> TODO FIX */}</div>
        </>
    );
};

export default MainLayout;
