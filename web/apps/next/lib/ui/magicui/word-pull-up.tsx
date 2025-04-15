'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface WordPullUpProps {
    words: string;
    delayMultiple?: number;
    wrapperFramerProps?: Variants;
    framerProps?: Variants;
    className?: string;
    triggerOnView?: boolean;
}

export default function WordPullUp({
    words,
    wrapperFramerProps = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    },
    framerProps = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    },
    className,
    triggerOnView = false,
}: WordPullUpProps) {
    const [inView, setInView] = useState(!triggerOnView);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!triggerOnView || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [triggerOnView]);

    return (
        <motion.h1
            ref={ref}
            variants={wrapperFramerProps}
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            className={cn(
                'font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
                className
            )}
        >
            {words.split(' ').map((word, i) => (
                <motion.span key={i} variants={framerProps} style={{ display: 'inline-block', paddingRight: '8px' }}>
                    {word === '' ? <span>&nbsp;</span> : word}
                </motion.span>
            ))}
        </motion.h1>
    );
}
