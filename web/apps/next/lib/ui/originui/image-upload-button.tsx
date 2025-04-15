'use client';
import { cn } from '@/lib/utils';
import { CircleUserRound, ImageUpIcon, SquarePen } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../button';

interface ImageUploadButtonProps {
    className?: string;
    onUpload: (file: File) => void;
    defaultImage?: string;
}

export default function BannerUploadButton({ className, onUpload, defaultImage }: ImageUploadButtonProps) {
    const previewRef = useRef<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null);

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setFileName(file.name);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                previewRef.current = url;
                onUpload(file);
            }
        },
        [onUpload]
    );

    const handleRemove = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setFileName(null);
        setPreviewUrl(null);
        previewRef.current = null;
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [previewUrl]);

    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current);
            }
        };
    }, []);

    return (
        <div className={cn('', className)}>
            <div className='relative flex flex-col items-center gap-2 align-top'>
                <div
                    className='relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-500/30 bg-white/50 backdrop-blur-3xl dark:border-input dark:bg-black/30 dark:backdrop-blur-sm sm:size-32'
                    aria-label={previewUrl ? 'Előnézet' : 'Alapértelmezett kép'}
                >
                    {previewUrl ? (
                        <Image
                            className='h-full w-full object-cover'
                            src={previewUrl}
                            alt='Előnézet'
                            width={64}
                            height={64}
                        />
                    ) : (
                        <div aria-hidden='true'>
                            <CircleUserRound className='opacity-60 dark:invert-0' size={64} strokeWidth={2} />
                        </div>
                    )}
                </div>
                <div className='group absolute top-0 size-full rounded-full'>
                    <Button
                        type='button'
                        onClick={handleButtonClick}
                        aria-haspopup='dialog'
                        className='flex h-full w-full items-center rounded-full bg-zinc-900/10 font-medium text-white opacity-0 backdrop-blur-sm transition-all hover:border hover:!bg-black/70 group-hover:opacity-100'
                    >
                        {fileName ? (
                            <SquarePen className='size-10 text-center' />
                        ) : (
                            <ImageUpIcon className='size-10 text-center' />
                        )}
                    </Button>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept='image/*'
                        aria-label='Upload image file'
                    />
                </div>
            </div>
            {fileName && (
                <div className='absolute mt-2 hidden'>
                    <div className='flex justify-center gap-2 text-xs'>
                        <p className='truncate text-muted-foreground' aria-live='polite'>
                            {fileName}
                        </p>{' '}
                        <button
                            onClick={handleRemove}
                            className='font-medium text-red-500 hover:underline'
                            aria-label={`Törlés: ${fileName}`}
                        >
                            Törlés
                        </button>
                    </div>
                </div>
            )}
            <div className='sr-only' aria-live='polite' role='status'>
                {previewUrl ? 'Image uploaded and preview available' : 'No image uploaded'}
            </div>
        </div>
    );
}
