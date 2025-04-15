'use client';

import type React from 'react';

import { Button } from '@/lib/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/lib/ui/dropdown-menu';
import { BarChart3, CheckSquare, FileText, HelpCircle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/use-media-query';

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'puzzle' | 'quiz' | 'poll' | 'slide';

interface QuestionTypeOption {
    type: QuestionType;
    title: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    gradient: string;
}

interface QuestionTypeSelectorProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSelectType: (type: QuestionType) => void;
}

export default function QuestionTypeSelector({
    isOpen = false,
    onClose = () => { },
    onSelectType,
}: QuestionTypeSelectorProps) {
    const [dialogOpen, setDialogOpen] = useState(isOpen);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        setDialogOpen(isOpen);
    }, [isOpen]);

    const handleDialogChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) onClose();
    };

    const questionTypes: QuestionTypeOption[] = [
        {
            type: 'multiple-choice',
            title: 'Feleletválasztós',
            description: 'Kérdés, amire több válasz is lehet helyes.',
            color: '#FF3355',
            gradient: 'from-rose-500 to-pink-600',
            icon: <HelpCircle size={16} className='text-white' />,
        },
        {
            type: 'true-false',
            title: 'Igaz / Hamis',
            description: 'Egy állítás ami igaz vagy hamis lehet.',
            color: '#4CAF50',
            gradient: 'from-green-400 to-emerald-600',
            icon: <CheckSquare size={16} className='text-white' />,
        },
        {
            type: 'poll',
            title: 'Felmérés',
            description: 'Kérdés, ahol a válaszokat szavazással gyűjtjük. Nem jár érte pont.',
            color: '#2196F3',
            gradient: 'from-blue-400 to-indigo-600',
            icon: <BarChart3 size={16} className='text-white' />,
        },
        {
            type: 'slide',
            title: 'Infó Slide',
            description: 'Egy slide, ami csak szöveges információval szolgál. Nem jár érte pont.',
            color: '#FF9800',
            gradient: 'from-amber-400 to-orange-600',
            icon: <FileText size={16} className='text-white' />,
        },
    ];

    const handleSelectType = (type: QuestionType) => {
        onSelectType(type);
        setDialogOpen(false);
        onClose();
    };

    return (
        <>
            <Dialog open={!isDesktop && dialogOpen} onOpenChange={handleDialogChange}>
                <DialogContent className='max-w-md rounded-xl border-0 p-0 shadow-2xl sm:max-w-md'>
                    <div className='relative px-6 py-8 text-white rounded-t-xl'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl font-bold text-white'>Kérdés típus választása</DialogTitle>
                            <p className='text-gray-500 font-medium mt-2'>Válaszd ki a kérdésed típusát</p>
                        </DialogHeader>
                    </div>

                    <div className='grid grid-cols-1 gap-3 p-6 sm:grid-cols-2'>
                        {questionTypes.map((item) => (
                            <button
                                key={item.type}
                                className='group flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-zinc-200 hover:bg-zinc-50/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-900/50 dark:hover:bg-zinc-900/80'
                                onClick={() => handleSelectType(item.type)}
                            >
                                <div
                                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md transition-transform group-hover:scale-110`}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-900 dark:text-white'>{item.title}</h3>
                                    <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>{item.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {isDesktop && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline'
                            className='flex w-full max-w-sm items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-transparent/5 hover:shadow-md'
                        >
                            <Plus className='h-4 w-4' />
                            <span>Új kérdés hozzáadása</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-72 rounded-xl border-0 bg-white p-2 shadow-xl dark:bg-black'>
                        {questionTypes.map((item) => (
                            <DropdownMenuItem
                                key={item.type}
                                onClick={() => handleSelectType(item.type)}
                                className='flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            >
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} shadow-sm`}
                                    aria-hidden='true'
                                >
                                    {item.icon}
                                </div>
                                <div className='flex-1'>
                                    <div className='text-sm font-semibold text-gray-900 dark:text-white'>{item.title}</div>
                                    <div className='text-xs text-gray-500 dark:text-gray-400'>{item.description}</div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}