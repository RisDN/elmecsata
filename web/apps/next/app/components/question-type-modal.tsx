'use client';

import { Button } from '@/lib/ui/button';
import { useState } from 'react';
import QuestionTypeSelector from './question-type-selector';

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'puzzle' | 'quiz' | 'poll' | 'slide';

export default function QuestionTypeIntegration() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

    const handleSelectType = (type: QuestionType) => {
        setSelectedType(type);
        setIsModalOpen(false);
    };

    return (
        <div className='p-4'>
            <div className='md:hidden'>
                <Button onClick={() => setIsModalOpen(true)} className='w-full'>
                    Kérdés hozzáadása
                </Button>
            </div>

            <QuestionTypeSelector
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectType={handleSelectType}
            />

            {selectedType && (
                <div className='mt-4 rounded-md border p-4'>
                    <p>
                        Utoljára kiválaszott típús: <strong>{selectedType}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}
