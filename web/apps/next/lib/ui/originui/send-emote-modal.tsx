'use client';
import { Angry, Frown, Heart, Laugh, Meh, Smile } from 'lucide-react';
import type React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../alert-dialog';

interface SendEmoteModalProps {
    children: React.ReactNode;
    sendEmote: (index: number) => void;
}

export const emotes = [
    <Smile className='size-6' key='smile' />,
    <Frown className='size-6' key='frown' />,
    <Angry className='size-6' key='angry' />,
    <Laugh className='size-6' key='laugh' />,
    <Meh className='size-6' key='meh' />,
    <Heart className='size-6' key='heart' />,
];

export default function SendEmoteModal({ children, sendEmote }: SendEmoteModalProps) {
    const handleEmoteSend = (index: number) => {
        sendEmote(index);

        // Close the dialog after sending the emote
        const dialogElement = document.querySelector('[data-state="open"]');
        const cancelButton = dialogElement?.querySelector('[role="button"]') as HTMLElement | null;
        cancelButton?.click();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hangulatjel küldése</AlertDialogTitle>
                    <AlertDialogDescription>Küldj hangulatjelet más játékosok számára.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className='mb-5 flex justify-evenly'>
                    {emotes.map((emote, index) => (
                        <button
                            key={index}
                            onClick={() => handleEmoteSend(index)}
                            className='flex h-12 w-12 items-center justify-center rounded-full hover:bg-muted/50 transition-colors'
                            type='button'
                        >
                            <span className='scale-150'>{emote}</span>
                        </button>
                    ))}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className='border-back border text-black hover:bg-transparent/5 dark:bg-black dark:text-white dark:hover:bg-white/10'>
                        Mégsem
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}