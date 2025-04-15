import Link from 'next/link';

export default function CreatorLink({ username }: { username?: string }) {
    return (
        <Link
            href={`/profile/${username || 'unknown'}`}
            className='text-xs font-medium'
        >
            <span className='hover:underline'>{username || 'Ismeretlen készítő'}</span>
        </Link>
    );
}
