/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./lib/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background))',
                foreground: 'rgb(var(--foreground))',
                card: {
                    DEFAULT: 'rgb(var(--card))',
                    foreground: 'rgb(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'rgb(var(--popover))',
                    foreground: 'rgb(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'rgb(var(--primary))',
                    foreground: 'rgb(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary))',
                    foreground: 'rgb(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'rgb(var(--muted))',
                    foreground: 'rgb(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent))',
                    foreground: 'rgb(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive))',
                    foreground: 'rgb(var(--destructive-foreground))',
                },
                success: {
                    DEFAULT: 'rgb(var(--success))',
                    foreground: 'rgb(var(--success-foreground))',
                },
                border: 'rgb(var(--border))',
                input: 'rgb(var(--input))',
                ring: 'rgb(var(--ring))',
                chart: {
                    '1': 'rgb(var(--chart-1))',
                    '2': 'rgb(var(--chart-2))',
                    '3': 'rgb(var(--chart-3))',
                    '4': 'rgb(var(--chart-4))',
                    '5': 'rgb(var(--chart-5))',
                },
                physics: 'rgb(var(--physics))',
                math: 'rgb(var(--math))',
                chemistry: 'rgb(var(--chemistry))',
                biology: 'rgb(var(--biology))',
                history: 'rgb(var(--history))',
                geography: 'rgb(var(--geography))',
                literature: 'rgb(var(--literature))',
                programming: 'rgb(var(--programming))',
                art: 'rgb(var(--art))',
                music: 'rgb(var(--music))',
                sports: 'rgb(var(--sports))',
                movies: 'rgb(var(--movies))',
                tv: 'rgb(var(--tv))',
                games: 'rgb(var(--games))',
                animals: 'rgb(var(--animals))',
                food: 'rgb(var(--food))',
                drinks: 'rgb(var(--drinks))',
                travel: 'rgb(var(--travel))',
                nature: 'rgb(var(--nature))',
                science: 'rgb(var(--science))',
                technology: 'rgb(var(--technology))',
                vehicles: 'rgb(var(--vehicles))',
                space: 'rgb(var(--space))',
                mythology: 'rgb(var(--mythology))',
                religion: 'rgb(var(--religion))',
                politics: 'rgb(var(--politics))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                meteor: {
                    '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
                    '70%': { opacity: '1' },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: '0',
                    },
                },
                ripple: {
                    '0%, 100%': {
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                        transform: 'translate(-50%, -50%) scale(0.9)',
                    },
                },
                grid: {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'spin-around': {
                    '0%': {
                        transform: 'translateZ(0) rotate(0)',
                    },
                    '15%, 35%': {
                        transform: 'translateZ(0) rotate(90deg)',
                    },
                    '65%, 85%': {
                        transform: 'translateZ(0) rotate(270deg)',
                    },
                    '100%': {
                        transform: 'translateZ(0) rotate(360deg)',
                    },
                },
                slide: {
                    to: {
                        transform: 'translate(calc(100cqw - 100%), 0)',
                    },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
                'marquee-vertical': {
                    from: { transform: 'translateY(0)' },
                    to: { transform: 'translateY(calc(-100% - var(--gap)))' },
                },
                'border-beam': {
                    '100%': {
                        'offset-distance': '100%',
                    },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                'pulse-slow': {
                    '0%, 100%': {
                        opacity: '1',
                    },
                    '50%': {
                        opacity: '0.8',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                meteor: 'meteor 5s linear infinite',
                ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
                grid: 'grid 50s linear infinite',
                'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
                slide: 'slide var(--speed) ease-in-out infinite alternate',
                marquee: 'marquee var(--duration) linear infinite',
                'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'gradient-x': 'gradient-x 15s ease infinite',
                float: 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out infinite 2s',
                'pulse-slow': 'pulse-slow 1s ease-in-out infinite',
            },
            boxShadow: {
                'to-top': '0px 0px 0px 2px hsl(0 0% 14.9%)',
                'to-top-hover': '0px 0px 0px 2px rgba(180, 160, 255, 0.253)',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), addVariablesForColors],
    safelist: [
        'bg-physics',
        'bg-math',
        'bg-chemistry',
        'bg-biology',
        'bg-history',
        'bg-geography',
        'bg-literature',
        'bg-programming',
        'bg-art',
        'bg-music',
        'bg-sports',
        'bg-movies',
        'bg-tv',
        'bg-games',
        'bg-animals',
        'bg-food',
        'bg-drinks',
        'bg-travel',
        'bg-nature',
        'bg-science',
        'bg-technology',
        'bg-vehicles',
        'bg-space',
        'bg-mythology',
        'bg-religion',
        'bg-politics',
        'border-physics',
        'border-math',
        'border-chemistry',
        'border-biology',
        'border-history',
        'border-geography',
        'border-literature',
        'border-programming',
        'border-art',
        'border-music',
        'border-sports',
        'border-movies',
        'border-tv',
        'border-games',
        'border-animals',
        'border-food',
        'border-drinks',
        'border-travel',
        'border-nature',
        'border-science',
        'border-technology',
        'border-vehicles',
        'border-space',
        'border-mythology',
        'border-religion',
        'border-politics',
    ],
};
export default config;

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

    addBase({
        ':root': newVars,
    });
}
