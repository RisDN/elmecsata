'use client';

import { useState, ChangeEvent } from 'react';

interface UseCharacterLimitProps {
    maxLength: number;
    defaultLength?: number;
}

export function useCharacterLimit({ maxLength, defaultLength }: UseCharacterLimitProps) {
    const [value, setValue] = useState('');
    const [characterCount, setCharacterCount] = useState(defaultLength || 0);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (newValue.length <= maxLength) {
            setValue(newValue);
            setCharacterCount(newValue.length);
        }
    };

    return {
        value,
        characterCount,
        handleChange,
        maxLength,
    };
}
