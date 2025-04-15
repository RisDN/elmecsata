'use client';

import { Messages } from '@/lib/localization/messages';
import { signIn } from 'next-auth/react';
import { Context, createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useUploadThing } from '../api/uploadthing/utils';

interface AuthProviderProps {
    username: string;
    password: string;
    passwordAgain: string;
    bio: string;
    avatarFile: File | undefined;
    loading: boolean;

    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    setPasswordAgain: (passwordAgain: string) => void;
    setBio: (bio: string) => void;
    setAvatarFile: (file: File) => void;

    authenticate: (method: 'login' | 'register') => void;
    clearFields: () => void;
    login: () => void;
    register: () => void;
}

const AuthProviderCtx = createContext<AuthProviderProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordAgain, setPasswordAgain] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [avatarFile, setAvatarFile] = useState<File>();
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

    const clearFields = () => {
        setUsername('');
        setPassword('');
        setPasswordAgain('');
    };

    const register = async () => {
        if (password !== passwordAgain) {
            toast.error(Messages.Auth_PasswordsDontMatch);
            return;
        }

        if (avatarFile === undefined) {
            toast.error(Messages.Auth_UploadProfileAvatar);
            return;
        }

        authenticate('register');
    };

    const login = async () => {
        authenticate('login');
    };

    const { startUpload } = useUploadThing('imageUploader', {
        onUploadError: (error) => {
            console.error(error);
            toast.error(Messages.Image_UploadFailed);
            setIsUploadingImage(false);
        },
        onUploadBegin: () => {
            toast.loading(Messages.Image_UploadInProgress);
            setIsUploadingImage(true);
        },
        onClientUploadComplete: (result) => {
            toast.success(Messages.Image_UploadSuccess);
            setIsUploadingImage(false);
        },
    });

    const authenticate = async (method: 'login' | 'register') => {
        if (!username || !password) {
            toast.error(Messages.Auth_EmptyFields);
            return;
        }

        if (avatarFile === undefined && method === 'register') {
            toast.error(Messages.Auth_UploadProfileAvatar);
            return;
        }

        let avatarUrl: string | undefined;
        if (method === 'register') {
            const iconUploadResult = await startUpload([avatarFile as File]);
            avatarUrl = iconUploadResult && iconUploadResult[0]?.key;
        }

        setLoading(true);
        toast.loading(Messages.Loading);
        const response = await fetch('/api/auth/' + method, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                avatarUrl,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        setLoading(false);
        toast.remove();

        if (data.success) {
            toast.success(data.message);
            setTimeout(() => {
                signIn('credentials', {
                    username: username,
                    password: password,
                    callbackUrl: '/profile',
                    redirect: true,
                });
            }, 2000);
            return;
        }

        toast.error(data.message);
    };

    return (
        <AuthProviderCtx.Provider
            value={{
                authenticate,
                clearFields,
                loading,
                password,
                passwordAgain,
                setPassword,
                setPasswordAgain,
                setUsername,
                username,
                login,
                register,
                setAvatarFile,
                avatarFile,
                bio,
                setBio,
            }}
        >
            {children}
        </AuthProviderCtx.Provider>
    );
};

export const useAuthProvider = () => useContext<AuthProviderProps>(AuthProviderCtx as Context<AuthProviderProps>);
