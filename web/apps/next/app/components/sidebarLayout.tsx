'use client';

import AvatarToolTip from '@/lib/ui/originui/avatar-dropdown';
import { Sidebar, SidebarBody, SidebarLink } from '@/lib/ui/sidebar';
import { cn, getImageUrl } from '@/lib/utils';
import { Quiz } from '@elmecsata/types';
import { motion } from 'framer-motion';
import { ExternalLink, JoystickIcon, Settings } from 'lucide-react';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import QuizEditModal from './quiz-settings-modal';

interface SidebarLayoutProps {
    user: User;
    quiz: Quiz;
    children?: React.ReactNode;
}

export const SidebarLayout = ({ user, quiz, children }: SidebarLayoutProps) => {
    const links = [
        {
            label: 'Játékhoz csatlakozás',
            href: '/join',
            icon: <JoystickIcon className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />,
        },
    ];
    const [open, setOpen] = useState(false);

    const handleSidebarClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div
            className={cn(
                'flex w-full flex-1 flex-col overflow-hidden bg-gray-100 dark:bg-neutral-800 md:flex-row',
                'h-full'
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className='justify-between gap-10' onClick={handleSidebarClick}>
                    <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                        {open ? <Logo /> : <LogoIcon />}
                        <div className='mt-8 flex flex-col gap-2'>
                            <Link
                                href={`/quiz/${quiz.id}`}
                                className={cn(
                                    'group/sidebar flex cursor-pointer items-center justify-start gap-2 py-2'
                                )}
                            >
                                <ExternalLink className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
                                <motion.span
                                    animate={{
                                        display: open ? 'inline-block' : 'none',
                                        opacity: open ? 1 : 0,
                                    }}
                                    className='!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200'
                                >
                                    Kvíz megtekintése
                                </motion.span>
                            </Link>
                            <QuizEditModal quiz={quiz}>
                                <div
                                    className={cn(
                                        'group/sidebar flex cursor-pointer items-center justify-start gap-2 py-2'
                                    )}
                                >
                                    <Settings className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
                                    <motion.span
                                        animate={{
                                            display: open ? 'inline-block' : 'none',
                                            opacity: open ? 1 : 0,
                                        }}
                                        className='!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200'
                                    >
                                        Kvíz beállításai
                                    </motion.span>
                                </div>
                            </QuizEditModal>
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <AvatarToolTip user={user}>
                        <div className='w-fit'>
                            <SidebarLink
                                link={{
                                    label: user.username,
                                    href: '/profile',
                                    icon: (
                                        <Image
                                            src={getImageUrl(user.avatar)}
                                            className='h-7 w-7 flex-shrink-0 rounded-full'
                                            width={50}
                                            height={50}
                                            alt='Avatar'
                                        />
                                    ),
                                }}
                            />
                        </div>
                    </AvatarToolTip>
                </SidebarBody>
            </Sidebar>
            <Dashboard>{children}</Dashboard>
        </div>
    );
};

export const Logo = () => {
    return (
        <Link href='/' className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'>
            <Image src='/imgs/logo.png' width={30} height={30} alt='Logo' className='size-6' />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='whitespace-pre font-medium text-black dark:text-white'
            >
                Elmecsata
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link href='/' className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'>
            <Image src='/imgs/logo.png' width={30} height={30} alt='Logo' className='size-6' />
        </Link>
    );
};

const Dashboard = ({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) => {
    return (
        <div className='flex flex-1'>
            <div className='flex w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white py-2 sm:px-2 backdrop-blur-sm dark:border-neutral-700 dark:bg-black/60 md:p-10'>
                {children ? (
                    children
                ) : (
                    <>
                        <div className='flex gap-2'>
                            {[...new Array(4)].map((i) => (
                                <div
                                    key={'first-array' + i}
                                    className='h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800'
                                ></div>
                            ))}
                        </div>
                        <div className='flex flex-1 gap-2'>
                            {[...new Array(2)].map((i) => (
                                <div
                                    key={'second-array' + i}
                                    className='h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800'
                                ></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
