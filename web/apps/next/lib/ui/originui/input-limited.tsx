'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Input } from '../input';

interface InputLimitedProps {
    maxLength?: number;
    label?: string;
    type: 'text' | 'password' | 'email' | 'number';
    className?: string;
    ref?: any;
    important?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minLength?: number;
    placeholder?: string;
    id?: string;
    defaultValue?: string;
}

export default function InputLimited({
    maxLength,
    label,
    type,
    className,
    ref,
    important,
    value,
    onChange,
    minLength,
    placeholder,
    id,
    defaultValue,
}: InputLimitedProps) {
    const [characterCount, setCharacterCount] = useState(defaultValue?.length || 0);
    const limit = maxLength || 9999;

    useEffect(() => {
        setCharacterCount(value?.length || 0);
    }, [value]);

    important = important ?? false;
    value = defaultValue || value;
    id = id || 'input-limited';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharacterCount(e.target.value.length);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className='space-y-2'>
            {label && (
                <p className={cn(`mb-2 text-sm font-bold dark:text-muted-foreground`)}>
                    {label}
                    {important && <span className='text-red-500'>*</span>}
                </p>
            )}
            <div className='relative'>
                <Input
                    className={cn(
                        `peer ${maxLength && 'pe-14'} border border-gray-500/30 bg-white/30 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white`,
                        className
                    )}
                    type={type}
                    id={id}
                    defaultValue={defaultValue || value}
                    required={important}
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-describedby='character-count'
                    ref={ref}
                />
                {maxLength && (
                    <div
                        id='character-count'
                        className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50'
                        aria-live='polite'
                        role='status'
                    >
                        {characterCount}/{limit}
                    </div>
                )}
            </div>
        </div>
    );
}
