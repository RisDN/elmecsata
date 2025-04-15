import { useId } from 'react';
import { LoginSignUpTabs } from '../../../app/components/login-singup-tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../dialog';
import { AuthProvider } from '@/app/providers/auth-provider';

interface SignModalProps {
    children: React.ReactNode;
}

export default function SignModal({ children }: SignModalProps) {
    const id = useId();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <div className='flex flex-col items-center gap-2'>
                    <DialogHeader>
                        <DialogTitle className='sm:text-center'>Profil</DialogTitle>
                        <DialogDescription className='sm:text-center'>
                            Csak pár információ és már kész is vagy!
                        </DialogDescription>
                    </DialogHeader>

                    <AuthProvider>
                        <LoginSignUpTabs />
                    </AuthProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
}
