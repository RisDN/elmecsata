'use client';
import { Quiz } from '@elmecsata/types';
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
    handleDelete: () => void;
    quiz: Quiz;
}

export default function QuizDeleteModal({ children, quiz, handleDelete }: ConfirmationAlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Biztosan ki szeretnéd törölni a(z) <span className='font-thin underline'>{quiz.name}</span>{' '}
                        kvízt?
                    </AlertDialogTitle>
                    <AlertDialogDescription>A művelet nem visszavonható!</AlertDialogDescription>
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
