'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
    const paths = [
        'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
        'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843',
        'M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811',
        'M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779',
        'M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747',
        'M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715',
        'M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683',
    ];
    return (
        <div
            className={cn(
                'absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]',
                className
            )}
        >
            <svg
                className='pointer-events-none absolute z-0 h-full w-full'
                width='100%'
                height='100%'
                viewBox='0 0 696 316'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683'
                    stroke='url(#paint0_radial_242_278)'
                    strokeOpacity='0.05'
                    strokeWidth='0.5'
                ></path>

                {paths.map((path, index) => (
                    <motion.path
                        key={`path-` + index}
                        d={path}
                        stroke={`url(#linearGradient-${index})`}
                        strokeOpacity='0.4'
                        strokeWidth='0.5'
                    ></motion.path>
                ))}
                <defs>
                    {paths.map((path, index) => (
                        <motion.linearGradient
                            id={`linearGradient-${index}`}
                            key={`gradient-${index}`}
                            initial={{
                                x1: '0%',
                                x2: '0%',
                                y1: '0%',
                                y2: '0%',
                            }}
                            animate={{
                                x1: ['0%', '100%'],
                                x2: ['0%', '95%'],
                                y1: ['0%', '100%'],
                                y2: ['0%', `${93 + Math.random() * 8}%`],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                ease: 'easeInOut',
                                repeat: Infinity,
                                delay: Math.random() * 10,
                            }}
                        >
                            <stop stopColor='#18CCFC' stopOpacity='0'></stop>
                            <stop stopColor='#18CCFC'></stop>
                            <stop offset='32.5%' stopColor='#6344F5'></stop>
                            <stop offset='100%' stopColor='#AE48FF' stopOpacity='0'></stop>
                        </motion.linearGradient>
                    ))}

                    <radialGradient
                        id='paint0_radial_242_278'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(352 34) rotate(90) scale(555 1560.62)'
                    >
                        <stop offset='0.0666667' stopColor='var(--neutral-300)'></stop>
                        <stop offset='0.243243' stopColor='var(--neutral-300)'></stop>
                        <stop offset='0.43594' stopColor='white' stopOpacity='0'></stop>
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
});

BackgroundBeams.displayName = 'BackgroundBeams';
