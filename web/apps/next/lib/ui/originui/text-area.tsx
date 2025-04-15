/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useCharacterLimit } from '@/app/hooks/use-character-limit';
import { ChangeEvent, useRef, useEffect } from 'react';
import { Textarea } from '../textarea';
import { cn } from '@/lib/utils';

interface TextAreaProps {
    label?: string;
    hint?: string;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    maxLength?: number;
    ref?: any;
    important?: boolean;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
    onChange,
    defaultValue,
    label,
    hint,
    placeholder,
    className,
    labelClassName,
    maxLength,
    ref,
    important,
}: TextAreaProps) {
    important = important ?? false;
    const textareaRef = ref || useRef<HTMLTextAreaElement>(null);
    const defaultRows = 1;
    const maxRows = undefined; // You can set a max number of rows

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';

        const style = window.getComputedStyle(textarea);
        const borderHeight = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
        const paddingHeight = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

        const lineHeight = parseInt(style.lineHeight);
        const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

        const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

        textarea.style.height = `${newHeight}px`;
    };

    const {
        value = defaultValue,
        characterCount,
        handleChange,
        maxLength: limit,
    } = useCharacterLimit({ maxLength: maxLength || 9999, defaultLength: defaultValue?.length });

    useEffect(() => {
        if (textareaRef.current) {
            handleInput({ target: textareaRef.current } as ChangeEvent<HTMLTextAreaElement>);
        }
    }, [defaultValue]);

    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between gap-1'>
                {label && (
                    <p className={cn('mb-2 text-sm font-bold text-black dark:text-muted-foreground', labelClassName)}>
                        {label}
                        {important && <span className='text-red-500'>*</span>}
                    </p>
                )}
                <span className='text-sm text-muted-foreground'>{hint}</span>
            </div>
            <div className='relative'>
                <Textarea
                    id='textarea-19'
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    ref={textareaRef}
                    maxLength={maxLength}
                    onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                        onChange && onChange(e);
                    }}
                    rows={defaultRows}
                    className={cn(
                        `!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white ${maxLength && 'pe-14'}`,
                        className
                    )}
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
