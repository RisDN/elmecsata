'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GameStartAnimation() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className='animate-game-start fixed inset-0 z-50 flex items-center justify-center bg-transparent/55 backdrop-blur-lg'
                    role='alert'
                    aria-live='assertive'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className='text-4xl font-bold text-white md:text-6xl'>A játék indul!</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
