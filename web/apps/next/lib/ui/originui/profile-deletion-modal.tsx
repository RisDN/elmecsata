'use client';
import { Messages } from '@/lib/localization/messages';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../alert-dialog';
interface ConfirmationAlertProps {
    children: React.ReactNode;
}

export default function ProfileDeletionModal({ children }: ConfirmationAlertProps) {
    const handleDelete = async () => {
        toast.remove();
        toast.loading(Messages.Loading);

        const response = await fetch('/api/profile/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            signOut();
            return;
        }

        toast.error(data.message);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Biztosan szeretnéd törölni a fiókodat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        A művelet nem visszavonható. Minden általad készített kvíz is törölve lesz!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='border-back border text-black hover:bg-transparent/5 dark:bg-black dark:text-white dark:hover:bg-white/10'>
                        Mégsem
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete()}
                        className='border border-destructive bg-destructive/30 text-black hover:bg-destructive/90 dark:text-white'
                    >
                        Igen, törölni szeretném
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
