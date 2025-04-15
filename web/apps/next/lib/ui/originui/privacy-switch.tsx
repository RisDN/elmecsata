'use client';

import { LockKeyhole, LockOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../radio-group';

export type PrivacyType = 'public' | 'private';

interface PrivacySwitchProps {
    onChange?: (value: PrivacyType) => void;
    defaultPrivacy?: PrivacyType;
}

export default function PrivacySwitch({ onChange, defaultPrivacy }: PrivacySwitchProps) {
    const [selectedValue, setSelectedValue] = useState(defaultPrivacy === 'public' ? 'on' : 'off');

    useEffect(() => {
        if (onChange) {
            onChange(selectedValue === 'on' ? 'public' : 'private');
        }
    }, [selectedValue, onChange]);

    return (
        <div className='inline-flex h-9 w-full rounded-lg bg-input/50 p-0.5'>
            <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
                className='group relative inline-grid w-full grid-cols-[1fr_1fr] items-center gap-0 rounded-lg bg-white/30 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-black after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full dark:bg-black/5'
                data-state={selectedValue}
            >
                <label className='relative z-[9] inline-flex h-full min-w-8 cursor-pointer items-center justify-center whitespace-nowrap px-4 group-data-[state=on]:text-muted-foreground/70'>
                    <span className='flex items-center gap-2 font-bold group-data-[state=off]:text-red-400'>
                        Privát <LockKeyhole className='size-4' />
                    </span>
                    <RadioGroupItem value='off' className='sr-only' />
                </label>
                <label className='relative z-[9] inline-flex h-full min-w-8 cursor-pointer items-center justify-center whitespace-nowrap px-4 group-data-[state=off]:text-muted-foreground/70'>
                    <span>
                        <span className='flex items-center gap-2 font-bold group-data-[state=on]:text-green-400'>
                            Nyilvános <LockOpen className='size-4' />
                        </span>
                    </span>
                    <RadioGroupItem value='on' className='sr-only' />
                </label>
            </RadioGroup>
        </div>
    );
}
