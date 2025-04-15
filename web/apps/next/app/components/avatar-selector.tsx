'use client';

import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarSelectorProps {
    selectedAvatar: number;
    onSelect: (id: number) => void;
}

export const AvatarValues = [
    'male_1',
    'male_2',
    'male_3',
    'female_1',
    'female_2',
    'female_3',
    'male_4',
    'male_5',
    'male_6',
    'female_4',
    'female_5',
    'female_6',
    'male_7',
    'male_8',
    'male_9',
    'female_7',
    'female_8',
    'female_9',
];

export function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
    const avatars = AvatarValues.map((avatar, index) => ({ id: index, avatar }));

    return (
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-6'>
            {avatars.map((avatar) => (
                <Button
                    key={avatar.id}
                    type='button'
                    variant='default'
                    size='lg'
                    onClick={() => onSelect(avatar.id)}
                    className={cn(
                        `h-20 w-20 rounded-full p-0 opacity-75`,
                        selectedAvatar === avatar.id && `h-20 w-20 opacity-100 ring-4 ring-slate-800 dark:ring-white`
                    )}
                >
                    <div
                        className={cn(
                            'h-20 w-20 overflow-hidden rounded-full',
                            selectedAvatar === avatar.id ? 'opacity-none' : 'opacity-50'
                        )}
                    >
                        <Image
                            src={`/imgs/avatars/${avatar.avatar}.png`}
                            className='pointer-events-none'
                            width={255}
                            height={255}
                            alt={avatar.avatar}
                        />
                    </div>
                </Button>
            ))}
        </div>
    );
}
