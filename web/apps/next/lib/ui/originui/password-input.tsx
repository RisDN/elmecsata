'use client';

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';
import { Input } from '../input';

interface PasswordInputProps {
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
}

export default function PasswordInput({ onPasswordChange, onConfirmPasswordChange }: PasswordInputProps) {
    const id = useId();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const toggleConfirmVisibility = () => setIsConfirmVisible((prevState) => !prevState);

    useEffect(() => {
        onPasswordChange(password);
        onConfirmPasswordChange(confirmPassword);
    }, [password, onPasswordChange, confirmPassword, onConfirmPasswordChange]);

    const checkStrength = (pass: string, confirmPass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: 'Minimum 8 karakter' },
            { regex: /[0-9]/, text: 'Minimum egy szám' },
            { regex: /[a-z]/, text: 'Minimum egy kis betű' },
            { regex: /[A-Z]/, text: 'Minimum egy nagy betű' },
            { regex: new RegExp(`^${pass}$`), text: 'A jelszavaknak egyezniük kell', confirm: true },
        ];

        return requirements.map((req) => ({
            met: req.confirm ? pass && pass === confirmPass : req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password, confirmPassword);

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return 'bg-border';
        if (score <= 1) return 'bg-red-500';
        if (score <= 2) return 'bg-orange-500';
        if (score === 3) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return 'Írj be egy jelszót';
        if (score <= 1) return 'Gyenge jelszó';
        if (score <= 2) return 'Közepes jelszó';
        if (score === 3) return 'Erős jelszó';
        return 'Nagyon erős jelszó';
    };

    const passwordsMatch = password === confirmPassword;

    return (
        <div className='space-y-2'>
            <div className='*:not-first:mt-2'>
                <div className='relative'>
                    <Input
                        id={id}
                        className='!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 pe-14 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white'
                        placeholder='Írd be jelszavad'
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby={`${id}-description`}
                    />
                    <button
                        className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                        type='button'
                        onClick={toggleVisibility}
                        aria-label={isVisible ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}
                        aria-pressed={isVisible}
                        aria-controls='password'
                    >
                        {isVisible ? (
                            <EyeOffIcon size={16} aria-hidden='true' />
                        ) : (
                            <EyeIcon size={16} aria-hidden='true' />
                        )}
                    </button>
                </div>
            </div>

            <div className='*:not-first:mt-2'>
                <div className='relative'>
                    <Input
                        id={`${id}-confirm`}
                        className='!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 pe-14 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white'
                        placeholder='Írd be újra a jelszavad'
                        type={isConfirmVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-describedby={`${id}-confirm-description`}
                    />
                    <button
                        className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                        type='button'
                        onClick={toggleConfirmVisibility}
                        aria-label={isConfirmVisible ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}
                        aria-pressed={isConfirmVisible}
                        aria-controls='confirm-password'
                    >
                        {isConfirmVisible ? (
                            <EyeOffIcon size={16} aria-hidden='true' />
                        ) : (
                            <EyeIcon size={16} aria-hidden='true' />
                        )}
                    </button>
                </div>
            </div>

            <div
                className='mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border'
                role='progressbar'
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-label='Jelszó erőssége'
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 5) * 100}%` }}
                ></div>
            </div>

            <p id={`${id}-description`} className='mb-2 text-sm font-medium text-foreground'>
                {getStrengthText(strengthScore)}. Követelmények:
            </p>

            <ul className='space-y-1.5' aria-label='Követelmények'>
                {strength.map((req, index) => (
                    <li key={index} className={`flex items-center gap-2 ${req.met ? '' : ''}`}>
                        {req.met ? (
                            <CheckIcon size={16} className='text-emerald-500' aria-hidden='true' />
                        ) : (
                            <XIcon size={16} className='text-muted-foreground/80' aria-hidden='true' />
                        )}
                        <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                            {req.text}
                            <span className='sr-only'>{req.met ? '- Teljesítve' : '- Nem teljesítve'}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
