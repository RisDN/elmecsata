'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
    return (
        <div className='flex align-middle items-center h-full w-full gap-1' onClick={() => signOut()}>
            <LogOut size={16} className='mr-2 opacity-60' aria-hidden='true' />
            <span>Kijelentkezés</span>
        </div>
    );
};

export default SignOutButton;
