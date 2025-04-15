'use client';
import { cn } from '@/lib/utils';
import { CatIcon, ImageUpIcon, SquarePen } from 'lucide-react';
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
        <div className='relative mb-96 h-full rounded-3xl bg-gradient-to-br from-white/40 from-10% to-white/40 dark:from-black dark:to-accent'>
            <div className={cn('size-full', className)}>
                <div className='relative flex size-full flex-col items-center gap-2 align-top'>
                    <div
                        className='relative flex size-full shrink-0 items-center justify-center overflow-hidden rounded-3xl border-b border-gray-500/30 bg-white/30 dark:border-input dark:bg-black/30'
                        aria-label={previewUrl ? 'Preview of uploaded image' : 'Default user avatar'}
                    >
                        {previewUrl ? (
                            <Image
                                className='h-full w-full object-cover'
                                src={previewUrl}
                                alt='Preview of uploaded image'
                                width={64}
                                height={64}
                            />
                        ) : (
                            <div aria-hidden='true'>
                                <CatIcon
                                    className='text-white opacity-60 invert dark:invert-0'
                                    size={64}
                                    strokeWidth={2}
                                />
                            </div>
                        )}
                    </div>
                    <div className='group absolute top-0 size-full rounded-3xl'>
                        <Button
                            onClick={handleButtonClick}
                            aria-haspopup='dialog'
                            className='flex h-full w-full items-center rounded-3xl border-black bg-zinc-900/10 font-medium text-white opacity-0 backdrop-blur-sm transition-all hover:border-b hover:!bg-black/70 group-hover:opacity-100 dark:border-input'
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
                                aria-label={`Remove ${fileName}`}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )}
                <div className='sr-only' aria-live='polite' role='status'>
                    {previewUrl ? 'Image uploaded and preview available' : 'No image uploaded'}
                </div>
            </div>
        </div>
    );
}
