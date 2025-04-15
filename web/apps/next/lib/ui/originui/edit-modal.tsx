'use client';

import { useCharacterLimit } from '@/app/hooks/use-character-limit';
import { useAuthProvider } from '@/app/providers/auth-provider';
import ImageUploadButton from '@/lib/ui/originui/image-upload-button';
import { CheckIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { Button } from '../button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog';
import { Input } from '../input';
import { Label } from '../label';
import PasswordInput from './password-input';
import TextArea from './text-area';
import { User } from 'next-auth';
import { getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Messages } from '@/lib/localization/messages';
import { useSession } from 'next-auth/react';
import { useUploadThing } from '@/app/api/uploadthing/utils';
import { validatePassword } from '@/lib/validations/password';
import ProfileDeletionModal from './profile-deletion-modal';

interface EditProfileModalProps {
    children: React.ReactNode;
    user: User;
}

export default function EditProfileModal({ children, user }: EditProfileModalProps) {
    const {
        password,
        bio,
        passwordAgain,
        avatarFile,
        setUsername,
        setPassword,
        setPasswordAgain,
        setAvatarFile,
        setBio,
    } = useAuthProvider();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const id = useId();

    const maxLength = 100;
    const {
        value,
        characterCount,
        handleChange,
        maxLength: limit,
    } = useCharacterLimit({
        maxLength,
    });

    const { update } = useSession();

    const { startUpload } = useUploadThing('imageUploader', {
        onUploadError: (error) => {
            console.error(error);
            toast.error(Messages.Image_UploadFailed);
        },
        onUploadBegin: () => {
            toast.loading(Messages.Image_UploadInProgress);
        },
        onClientUploadComplete: (result) => {
            toast.success(Messages.Image_UploadSuccess);
        },
    });

    const editProfile = async () => {
        toast.remove();

        if (password !== '' && !validatePassword(password)) {
            toast.error(Messages.Auth_PasswordWrongFormat);
            return;
        }
        setIsLoading(true);
        let avatarUrl: string | undefined = user.avatar;

        if (avatarFile !== undefined) {
            const iconUploadResult = await startUpload([avatarFile]);
            avatarUrl = iconUploadResult && iconUploadResult[0]?.key;
        }

        toast.loading(Messages.Loading);
        const response = await fetch('/api/profile/edit', {
            method: 'POST',
            body: JSON.stringify({
                bio: bio,
                newPassword: password,
                newPasswordAgain: passwordAgain,
                avatarKey: avatarUrl,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        toast.remove();
        if (data.success) {
            toast.success(data.message);
            await update({
                ...user,
                bio: bio,
                avatar: avatarUrl,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            return;
        }
        setIsLoading(false);
        toast.error(data.message);
    };

    useEffect(() => {
        setUsername(user.username);
        setBio(user.bio);
    }, [user.username, setUsername, user.bio, setBio]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5'>
                <DialogHeader className='contents space-y-0 text-left'>
                    <DialogTitle className='border-b px-6 py-4 text-base'>Profil szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogDescription className='sr-only'>A felhasználói profil szerkesztése.</DialogDescription>
                <div className='overflow-y-auto'>
                    <div className='px-6 pb-6 pt-4'>
                        <div className='relative flex justify-center'>
                            <ImageUploadButton defaultImage={getImageUrl(user.avatar)} onUpload={setAvatarFile} />
                        </div>
                        <form className='space-y-4'>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`${id}-username`}>Felhasználónév</Label>
                                <div className='relative'>
                                    <Input
                                        id={`${id}-username`}
                                        className='!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 pe-14 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white'
                                        placeholder='Felhasználónév'
                                        defaultValue={user.username}
                                        type='text'
                                        disabled
                                        required
                                    />
                                    <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                                        <CheckIcon size={16} className='text-emerald-500' aria-hidden='true' />
                                    </div>
                                </div>
                            </div>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`${id}-bio`}>Bemutatkozás</Label>
                                <TextArea
                                    defaultValue={user.bio}
                                    placeholder='Írj valamit magadról...'
                                    maxLength={maxLength}
                                    onChange={(e) => setBio(e.currentTarget.value)}
                                    className='!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 pe-14 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white'
                                />
                            </div>
                            <div className='*:not-first:mt-2'>
                                <Label htmlFor={`${id}-password`}>Új jelszó</Label>
                                <PasswordInput
                                    onPasswordChange={setPassword}
                                    onConfirmPasswordChange={setPasswordAgain}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <DialogFooter className='flex !justify-between border-t px-6 py-4'>
                    <DialogClose asChild>
                        <ProfileDeletionModal>
                            <Button
                                type='button'
                                variant='ghost'
                                className='border border-destructive bg-destructive/30 hover:bg-destructive/90'
                            >
                                Fiók törlése
                            </Button>
                        </ProfileDeletionModal>
                    </DialogClose>
                    <div className='flex gap-2'>
                        <DialogClose asChild>
                            <Button type='button' variant='ghost' className='bg-back/30 border-back border'>
                                Mégsem
                            </Button>
                        </DialogClose>
                        <Button
                            type='button'
                            onClick={() => editProfile()}
                            disabled={isLoading}
                            className='border border-primary bg-primary/30'
                        >
                            Mentés
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
