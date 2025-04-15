'use client';
import { signOut } from 'next-auth/react';
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
    username: string;
}

const logoutMessages = [
    '%username%, tényleg itt hagysz minket? A szerver sírni fog! 😢',
    'Ha most elmész, egy kis pixel odabenn meghal... gondold át! 🖥️💔',
    '%username%, ne menj! Legalább egy kávéra maradj! ☕😅',
    'Kijelentkezés? Hát nem mi voltunk a legjobb barátaid? 🤖🥺',
    'Ha most kilépsz, az NPC-k is megjegyzik! 😱',
    'Biztos vagy benne, hogy a külvilág jobb ennél? 🌍 vs. 🖥️',
    'A kijelentkezés után ki fog engem szórakoztatni? 😭',
    'A rendszer ezt személyes sértésnek veszi! 🤨',
    'Nincs auto-save! Biztos nem maradsz még egy kicsit? 😅',
    'A kijelentkezés szponzora: a magány. 😔',
    'Várj! Mielőtt elmész, mit szólnál egy logout-díjhoz? 🎉',
    'Most mész el? De még épphogy megismertelek! 🥹',
    'Ha elmész, ki fogja etetni a szerverpixeleket?! 🍔🖥️',
    'A kilépés visszavonhatatlan... kivéve, ha újra bejelentkezel. 😉',
    '%username%, ha kimész, hozz vissza valami kaját! 🍕😆',
];

export default function LogoutModal({ children, username }: ConfirmationAlertProps) {
    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * logoutMessages.length);
        return logoutMessages[randomIndex].replace('%username%', username);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Biztosan ki szeretnél jelentkezni?</AlertDialogTitle>
                    <AlertDialogDescription>{getRandomMessage()}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='border-back border text-black hover:bg-transparent/5 dark:bg-black dark:text-white dark:hover:bg-white/10'>
                        Mégsem
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => signOut()}
                        className='border border-destructive bg-destructive/30 text-black hover:bg-destructive/90 dark:text-white'
                    >
                        Kijelentkezés
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
