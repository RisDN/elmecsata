import { AvatarValues } from '@/app/components/avatar-selector';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getImageUrl(avatar: string) {
    return `https://${process.env.NEXT_PUBLIC_UPLOADTHING_PROJECTID}.ufs.sh/f/` + avatar;
}

export function getPlayerAvatar(index: number) {
    return '/imgs/avatars/' + AvatarValues[index] + '.png';
}
