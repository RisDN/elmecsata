'use client';

import { Button } from '@/lib/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/lib/ui/dropdown-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useThemeProvider } from './providers/theme-provider';

export function ModeToggle() {
    const { switchDefaultTheme, theme } = useThemeProvider();

    const toggleTheme = () => {
        switchDefaultTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    onClick={() => toggleTheme()}
                    variant='outline'
                    size='icon'
                    className='group rounded-full bg-black/15 transition-all dark:bg-black/30'
                >
                    <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all group-hover:invert dark:-rotate-90 dark:scale-0' />
                    <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 invert transition-all dark:rotate-0 dark:scale-100' />
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}
