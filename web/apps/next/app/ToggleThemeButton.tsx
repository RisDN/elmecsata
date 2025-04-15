'use client';

import { Button } from '@/lib/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useThemeProvider } from './providers/theme-provider';

export function ModeToggle() {
    const { theme, switchDefaultTheme } = useThemeProvider();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        switchDefaultTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='group w-full rounded-lg bg-transparent/10 text-white transition-all hover:bg-transparent/20 hover:text-white dark:bg-white/10 dark:hover:bg-white/20'
        >
            {theme === 'dark' ? (
                <div className='flex items-center gap-2 px-4 text-white'>
                    <SunIcon className='h-[1.2rem] w-[1.2rem] transition-all' />
                    <span>Világos mód</span>
                </div>
            ) : (
                <div className='flex items-center gap-2 px-4 text-black'>
                    <MoonIcon className='h-[1.2rem] w-[1.2rem] transition-all' />
                    <span>Sötét mód</span>
                </div>
            )}
            <span className='sr-only'>Téma változtatása</span>
        </Button>
    );
}
