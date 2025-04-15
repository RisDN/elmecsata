import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '../app/api/uploadthing/core';
import Preloader from './components/preloader';
import './globals.css';
import NextAuthProvider from './providers/session-provider';
import { SocketProvider } from './providers/socket-provider';
import { ThemeProvider } from './providers/theme-provider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Elmecsata',
    description: `Az Elmecsata egy modern, online 'real-time' kvíz játék Hozd létre saját kvízeidet, vagy játsz a többi játékos kvízeivel!`,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookie = await cookies();
    const preferedTheme = cookie.get('prefered-theme')?.value;
    const theme = cookie.get('theme')?.value || preferedTheme || '';

    return (
        <html lang='hu' className={`${theme}`} style={{ colorScheme: theme }}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Toaster
                    position='top-right'
                    reverseOrder={false}
                    gutter={16}
                    toastOptions={{
                        duration: 4000,
                        className: 'toast',
                        position: 'top-center',
                        success: {
                            className: 'toast-success',
                            iconTheme: {
                                primary: 'rgb(var(--success-foreground))',
                                secondary: 'rgb(var(--success))',
                            },
                            duration: 2000,
                        },
                        error: {
                            className: 'toast-error',
                            iconTheme: {
                                primary: 'rgb(var(--destructive-foreground))',
                                secondary: 'rgb(var(--destructive))',
                            },
                            duration: 2000,
                        },
                    }}
                />
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                <SocketProvider>
                    <NextAuthProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </NextAuthProvider>
                </SocketProvider>
                <Preloader />
            </body>
        </html>
    );
}
