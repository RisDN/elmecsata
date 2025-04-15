'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        setIsLoading(false);
    }, []);

    if (!isLoading) {
        return null;
    }
    return (
        <div
            id='preloader'
            className='fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-black/50'
        >
            <Image
                unoptimized
                height={128}
                width={128}
                src='/imgs/Preloader.gif'
                alt='Preloader.gif'
                className='size-32'
            />
        </div>
    );
};

export default Preloader;
