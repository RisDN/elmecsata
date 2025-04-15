'use client';

import { ArrowUp } from 'lucide-react';

const ScrollTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <span
            onClick={() => scrollToTop()}
            className={`group fixed bottom-5 flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border-none bg-black font-semibold shadow-to-top-hover duration-300 before:absolute before:-bottom-5 before:text-[0rem] before:text-white before:content-['Az_oldal_tetejére'] hover:w-36 hover:items-center hover:bg-primary/50 hover:duration-300 hover:before:bottom-[unset] hover:before:text-sm hover:before:opacity-100 hover:before:duration-300`}
        >
            <ArrowUp className='w-3 text-white duration-300 group-hover:-translate-y-[200%] group-hover:duration-300' />
        </span>
    );
};

export default ScrollTop;
