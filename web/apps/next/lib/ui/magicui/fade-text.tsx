'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';

type FadeTextProps = {
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    framerProps?: Variants;
    text: string;
    triggerOnView?: boolean;
};

export function FadeText({
    direction = 'up',
    className,
    framerProps = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { type: 'spring' } },
    },
    text,
    triggerOnView = false,
}: FadeTextProps) {
    const [inView, setInView] = useState(!triggerOnView);
    const ref = useRef<HTMLDivElement>(null);

    const directionOffset = useMemo(() => {
        const map = { up: 10, down: -10, left: -10, right: 10 };
        return map[direction];
    }, [direction]);

    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';

    const FADE_ANIMATION_VARIANTS = useMemo(() => {
        const { hidden, show, ...rest } = framerProps as {
            [name: string]: { [name: string]: number; opacity: number };
        };

        return {
            ...rest,
            hidden: {
                ...(hidden ?? {}),
                opacity: hidden?.opacity ?? 0,
                [axis]: hidden?.[axis] ?? directionOffset,
            },
            show: {
                ...(show ?? {}),
                opacity: show?.opacity ?? 1,
                [axis]: show?.[axis] ?? 0,
            },
        };
    }, [directionOffset, axis, framerProps]);

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
        <motion.div ref={ref} initial='hidden' animate={inView ? 'show' : 'hidden'} variants={FADE_ANIMATION_VARIANTS}>
            <motion.span className={className}>{text}</motion.span>
        </motion.div>
    );
}
