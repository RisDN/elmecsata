'use client';
import SignOutButton from '@/app/components/sign-out-button';
import { getImageUrl } from '@/lib/utils';
import { Quiz } from '@elmecsata/types';
import { BoltIcon } from 'lucide-react';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

interface AvatarToolTipProps {
    children: React.ReactNode;
    user: User;
}

export default function AvatarToolTip({ children, user }: AvatarToolTipProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className='space-y-2 bg-black py-3 dark:bg-black/60'>
                    <div className='mb-2 flex min-w-0 flex-col border-0 border-b border-zinc-500 pb-2'>
                        <span className='truncate text-sm font-semibold text-white'>{user.username}</span>
                        <span className='truncate text-xs font-normal text-white/70'>{user.email}</span>
                    </div>
                    <Link href={'/profile'} className=''>
                        <div className='mb-2 mt-2 border-0 border-b border-zinc-500 pb-2'>
                            <div className='flex h-full w-full gap-1 rounded-md p-2 hover:cursor-pointer hover:bg-white/5'>
                                <BoltIcon size={16} className='mr-2 opacity-60' aria-hidden='true' />
                                <span>Profilom és kvízeim</span>
                            </div>
                        </div>
                    </Link>
                    {user.quizzes.length > 0 && (
                        <>
                            <div className='mb-2 truncate text-sm font-medium text-zinc-500'>Gyors szerkesztés</div>
                            <div className='flex flex-col gap-2'>
                                {user.quizzes.map((quiz: Quiz) => (
                                    <Link href={'/edit/' + quiz.id} key={quiz.id} className=''>
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
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                    <div className='my-4 rounded-md border border-red-500 bg-red-500/10 p-2 text-red-500 transition-all hover:cursor-pointer hover:!bg-red-950 hover:bg-white/5 hover:text-white'>
                        <SignOutButton />
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
