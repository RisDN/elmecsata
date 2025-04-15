'use client';

import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

interface DateFormatterProps {
    date: string | number | Date;
    formatString?: string;
}

export function DateFormatter({ date, formatString = 'yyyy. MM. dd.' }: DateFormatterProps) {
    return <span>{format(new Date(date), formatString, { locale: hu })}</span>;
}
