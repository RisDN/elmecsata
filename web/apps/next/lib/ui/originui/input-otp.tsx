'use client';

import { cn } from '@/lib/utils';
import { OTPInput, type SlotProps } from 'input-otp';
import { useId } from 'react';

interface InputOTPProps {
    maxLength?: number;
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
}

export default function InputOTP({ maxLength, onChange, onComplete, value }: InputOTPProps) {
    const id = useId();
    return (
        <div className=''>
            <OTPInput
                id={id}
                containerClassName='flex items-center gap-3 has-[:disabled]:opacity-50'
                maxLength={maxLength || 4}
                value={value}
                onChange={onChange}
                onComplete={onComplete}
                render={({ slots }) => (
                    <div className='flex gap-2'>
                        {slots.map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                        ))}
                    </div>
                )}
            />
        </div>
    );
}

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                'flex size-9 items-center justify-center rounded-lg border border-input bg-background text-3xl font-bold text-foreground shadow-sm shadow-black/5 transition-shadow sm:size-12',
                { 'z-10 border border-ring ring-[3px] ring-ring/20': props.isActive }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    );
}
