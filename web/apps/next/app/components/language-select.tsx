'use client';

import { Check, ChevronDown } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

import { Button } from '@/lib/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/lib/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/ui/popover';
import { cn } from '@/lib/utils';
import { ContinentData, Country } from '@elmecsata/types';
import CountryFlag from '@/lib/ui/originui/country-flag';

interface LanguageSelectProps {
    label?: string;
    important?: boolean;
    data: ContinentData[];
    defaultCountry: Country;

    onChange?: (value: string) => void;
}

export default function LanguageSelect({ label, important, data, defaultCountry, onChange }: LanguageSelectProps) {
    important = important ?? false;

    const [open, setOpen] = useState<boolean>(false);

    const [value, setValue] = useState<string>(defaultCountry?.country || '');

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value, onChange]);

    return (
        <div className='space-y-2 text-white'>
            {label && (
                <p className='mb-2 text-sm font-bold text-black dark:text-muted-foreground'>
                    {label}
                    {important && <span className='text-red-500'>*</span>}
                </p>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id='select-44'
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='!mt-0 w-full justify-between border border-gray-500/30 bg-white/30 px-3 font-normal outline-offset-0 hover:bg-white/30 focus-visible:!border-primary/50 focus-visible:outline-[3px] focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:hover:bg-black/30'
                    >
                        {value ? (
                            <span className='flex min-w-0 items-center'>
                                <span className='mr-2 text-lg leading-none'>
                                    {data.map((group, _index) =>
                                        group.items.map((country) => {
                                            if (country.country === value) {
                                                return (
                                                    <CountryFlag key={country.id} countryCode={country.country_code} />
                                                );
                                            }
                                        })
                                    )}
                                </span>
                                <span className='truncate font-bold text-black dark:text-white'>{value}</span>
                            </span>
                        ) : (
                            <span className='text-muted-foreground'>Ország választása</span>
                        )}
                        <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className='shrink-0 text-muted-foreground/80'
                            aria-hidden='true'
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full min-w-[var(--radix-popper-anchor-width)] p-0' align='start'>
                    <Command>
                        <CommandInput placeholder='Kezdj el gépelni...' />
                        <CommandList>
                            <CommandEmpty>Ismeretlen ország.</CommandEmpty>
                            {data.map((group, _index) => (
                                <Fragment key={group.continent.name}>
                                    <CommandGroup heading={group.continent.name}>
                                        {group.items.map((country) => (
                                            <CommandItem
                                                key={country.country}
                                                value={country.country}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <span className='mr-2 text-lg leading-none'>
                                                    <CountryFlag countryCode={country.country_code} />
                                                </span>{' '}
                                                {country.country}
                                                <Check
                                                    className={cn(
                                                        'ml-auto',
                                                        value === country.country ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Fragment>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
