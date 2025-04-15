'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

interface SortableBoxProps {
    id: string;
    children: React.ReactNode;
}

export function SortableBox({ id, children }: SortableBoxProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const [ariaDescribedBy, setAriaDescribedBy] = useState<string | undefined>(undefined);

    useEffect(() => {
        setAriaDescribedBy(`DndDescribedBy-${id}`);
    }, [id]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            aria-describedby={ariaDescribedBy}
            className='touch-none'
        >
            {children}
        </div>
    );
}
