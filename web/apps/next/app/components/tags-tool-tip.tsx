'use client';

import TinyToolTip from '@/lib/ui/originui/tool-tip';
import type { QuizTag } from '@elmecsata/types';

export default function TagsTooltip({ tags }: { tags: QuizTag[] }) {
    return (
        <div className='relative'>
            <span className='rounded-full border border-gray-300 px-1.5 py-0.5 text-xs dark:border-gray-700'>
                +{tags.length}
            </span>
        </div>
    );
}
