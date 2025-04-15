'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PlayerEmoteDisplayProps {
    emote: ReactNode | null;
    isVisible: boolean;
}

export default function PlayerEmoteDisplay({ emote, isVisible }: PlayerEmoteDisplayProps) {
    return (
        <AnimatePresence>
            {isVisible && emote && (
                <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.5 }}
                    animate={{ y: -0, opacity: 1, scale: 1.5 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-full flex items-center justify-center'
                >
                    {emote}
                </motion.div>
            )}
        </AnimatePresence>
    );
}