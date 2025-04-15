'use client';
import { QuizTag } from '@elmecsata/types';
import MultipleSelector, { Option } from '@/lib/ui/originui/multiple-selector';
import { useState } from 'react';

interface MultipleSelectProps {
    className?: string;
    label?: string;
    important?: boolean;
    quizTags: QuizTag[];
    setTags?: (tags: QuizTag[]) => void;
}

export default function QuizTagSelector({ className, label, important, quizTags, setTags }: MultipleSelectProps) {
    important = important ?? false;

    const defaultTagOptions = quizTags.map((tag) => {
        return {
            value: tag.id.toString(),
            label: tag.label,
            color: tag.color,
        } as Option;
    });

    const [selectedTags, setSelectedTags] = useState<Option[]>(defaultTagOptions.slice(0, 2));

    const change = (options: Option[]) => {
        setSelectedTags(options);
        if (setTags) {
            setTags(options.map((option) => quizTags.find((tag) => tag.id.toString() === option.value)!));
        }
    };

    return (
        <div className='space-y-2'>
            {label && (
                <p className='mb-2 text-sm font-bold text-black dark:text-muted-foreground'>
                    {label}
                    {important && <span className='text-red-500'>*</span>}
                </p>
            )}
            <MultipleSelector
                commandProps={{
                    label: 'Válassz ki témaköröket',
                }}
                value={selectedTags}
                defaultOptions={defaultTagOptions}
                onChange={change}
                placeholder='Válassz ki témaköröket'
                hidePlaceholderWhenSelected
                emptyIndicator={<p className='text-center text-sm text-black dark:text-white'>Nincs találat</p>}
                badgeClassName={`border text-black dark:text-white`}
                className='z-10 border border-gray-500/30 bg-white/30 hover:border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30'
            />
        </div>
    );
}
