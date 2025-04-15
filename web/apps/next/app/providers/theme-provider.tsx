'use client';
import Cookies from 'js-cookie';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type ThemeCtxType = {
    theme: string;
    switchDefaultTheme: (theme: string) => void;
};

const ThemeProviderCtx = createContext<ThemeCtxType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState('light');
    const systemPrefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined, (isSystemDark) =>
        setTheme(isSystemDark ? 'dark' : 'light')
    );

    useEffect(() => {
        const defaultTheme = Cookies.get('theme');
        const theme = defaultTheme || (systemPrefersDark ? 'dark' : 'light');

        switchDefaultTheme(theme);
    }, [theme, systemPrefersDark]);

    useEffect(() => {
        Cookies.set('prefered-theme', systemPrefersDark ? 'dark' : 'light', { expires: 400 });
    }, [systemPrefersDark]);

    const switchDefaultTheme = (theme: string) => {
        setTheme(theme);
        Cookies.set('theme', theme, { expires: 400 });
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.style.colorScheme = theme;
    };

    return (
        <ThemeProviderCtx.Provider
            value={{
                switchDefaultTheme,
                theme,
            }}
        >
            {children}
        </ThemeProviderCtx.Provider>
    );
};

export const useThemeProvider = () => useContext<ThemeCtxType>(ThemeProviderCtx as Context<ThemeCtxType>);
