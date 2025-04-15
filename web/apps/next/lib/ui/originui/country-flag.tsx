import { cn } from '@/lib/utils';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface CountryFlagProps {
    countryCode: string;
    className?: string;
}

export default function CountryFlag({ countryCode, className }: CountryFlagProps) {
    return (
        <div>
            <ReactCountryFlag countryCode={countryCode} svg className={cn('', className)} title={countryCode} />
        </div>
    );
}
