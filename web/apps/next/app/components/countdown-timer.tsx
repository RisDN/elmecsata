'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
    seconds: number;
    onComplete: () => void;
}

export function CountdownTimer({ seconds, onComplete }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 100);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    return (
        <div className='flex flex-col items-center justify-center space-y-2'>
            <div
                className={cn('text-6xl font-bold transition-transform duration-100', isAnimating && 'scale-125')}
                role='timer'
                aria-live='polite'
            >
                {timeLeft}
            </div>
            <div className='text-xl text-muted-foreground'>A játék indul...</div>
        </div>
    );
}
