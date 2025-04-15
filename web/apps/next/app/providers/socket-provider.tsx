'use client';

import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../socket';
import toast from 'react-hot-toast';
import { Game } from '@elmecsata/types';
import { redirect } from 'next/navigation';

type SocketProviderProps = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
    isConnected: boolean;

    id?: string;

    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;

    startGame: (quizId: string) => void;
};

const SocketProviderCtx = createContext<SocketProviderProps>({} as SocketProviderProps);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [id, setId] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (socket.connected && !isConnected) {
            onConnect();
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('start-game-callback', (rawGame: string) => {
            const game: Game = JSON.parse(rawGame);

            if (!game) {
                toast.error('Hiba történt a játék indítása során!');
                return;
            }

            localStorage.setItem('hostedId', socket?.id || '');

            redirect(`/session/${game.code}/wait`);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [isConnected]);

    const startGame = (quizId: string) => {
        socket?.emit('start-game', quizId, id);
    };

    function onConnect() {
        setIsConnected(true);
        setId(socket.id);
        console.log(`Connected to server with id: ${socket.id}`);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    return (
        <SocketProviderCtx.Provider
            value={{
                socket,
                isConnected,
                id,

                isLoading,
                setIsLoading,

                startGame,
            }}
        >
            {children}
        </SocketProviderCtx.Provider>
    );
};

export const useSocket = () => useContext(SocketProviderCtx);
