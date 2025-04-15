import { BorderBeam } from '@/lib/ui/magicui/border-beam';
import DotPattern from '@/lib/ui/magicui/dot-pattern';
import { FadeText } from '@/lib/ui/magicui/fade-text';
import Meteors from '@/lib/ui/magicui/meteors';
import ShimmerButton from '@/lib/ui/magicui/shimmer-button';
import WordPullUp from '@/lib/ui/magicui/word-pull-up';
import { cn } from '@/lib/utils';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Code, Mail, MapPinHouse, Monitor, Phone, ScanQrCode, Swords, TrendingUpDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from './MainLayout';
import PopularQuizzes from './OnGoingGames';
import NotLoggedInToast from './components/not-logged-in-toast';

export default function Home() {
    return (
        <MainLayout>
            <NotLoggedInToast />
            <div className='absolute top-0 z-[-2] h-screen w-screen overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
                <Meteors number={30} />
                <section id='hero' className='relative flex h-screen w-full flex-col items-center justify-center'>
                    <div className='relative flex w-full flex-col items-center justify-start'>
                        <div className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
                            <WordPullUp
                                className='z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tight text-black dark:text-white'
                                words='Üdvözöllek az ElmeCsata oldalán!'
                            />
                            <FadeText
                                className='block text-2xl font-normal text-black dark:text-white'
                                direction='up'
                                framerProps={{
                                    show: { transition: { delay: 0.7 } },
                                }}
                                text='Ahol a tudás hatalom!'
                            />
                            <Link
                                href={'/join'}
                                className='mt-3 flex w-full flex-row items-center justify-center space-x-2'
                            >
                                <ShimmerButton className='shadow-2xl'>
                                    <span className='whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg'>
                                        Csatlakozás kód segítségével
                                    </span>
                                </ShimmerButton>
                            </Link>
                        </div>
                    </div>
                </section>
                <section id='onGoingGames'>
                    <div className='container mx-auto px-4 py-12 md:px-8'>
                        <FadeText
                            className='flex items-center justify-center text-center text-lg font-semibold text-gray-500'
                            direction='down'
                            text='Népszerű kvízek'
                            framerProps={{
                                show: { transition: { delay: 0.3 } },
                            }}
                            triggerOnView={true}
                        />
                        <div className='relative mt-6 overflow-y-visible'>
                            <PopularQuizzes />
                        </div>
                    </div>
                </section>
                <section id='about'>
                    <div className='rounded-t-[7rem] bg-gradient-to-b from-white/100 to-transparent dark:from-black/100 dark:to-transparent'>
                        <div className='className="relative container mx-auto max-w-7xl px-4 py-16'>
                            <div className='container mx-auto px-4 py-12 md:px-8'>
                                <FadeText
                                    className='flex items-center justify-center text-center text-lg font-semibold text-gray-500'
                                    direction='down'
                                    text='Rólunk'
                                    framerProps={{
                                        show: { transition: { delay: 0.3 } },
                                    }}
                                    triggerOnView={true}
                                />
                                <WordPullUp
                                    className='mx-auto mt-4 max-w-xs text-center text-3xl font-semibold text-black dark:text-white sm:max-w-none sm:text-4xl md:text-5xl'
                                    words='Az ElmeCsata egy online kvíz játék, ahol a tudás hatalom!'
                                    triggerOnView={true}
                                />
                                <FadeText
                                    className='mt-6 flex items-center justify-center text-center text-muted-foreground'
                                    direction='up'
                                    text='Az ElmeCsata egy online kvíz játék, ahol a tudás hatalom! A játék során a játékosok különböző témákban mérhetik össze tudásukat egymással. A játék során a játékosok különböző témákban mérhetik össze tudásukat egymással.'
                                    framerProps={{
                                        show: { transition: { delay: 1.2 } },
                                    }}
                                    triggerOnView={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id='features'>
                    <div className='container relative mx-auto max-w-7xl px-4 py-16'>
                        <FadeText
                            className='flex items-center justify-center text-center text-lg font-semibold text-gray-500'
                            direction='down'
                            text='Előnyök'
                            framerProps={{
                                show: { transition: { delay: 0.3 } },
                            }}
                            triggerOnView={true}
                        />
                        <div className='container mx-auto mt-12 grid h-full grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-8'>
                            <div className='group relative rounded-3xl border border-primary/30 bg-primary/5 text-card-foreground shadow-none'>
                                <div className='space-y-4 p-6'>
                                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                                        <ScanQrCode className='text-primary' />
                                    </div>
                                    <h3 className='text-xl font-semibold'>Gyors csatlakozás</h3>
                                    <p className='text-muted-foreground'>
                                        Csatlakozz a játékhoz QR kód segítségével vagy kódot megadva gyorsan és
                                        egyszerűen.
                                    </p>
                                </div>
                                <BorderBeam
                                    size={250}
                                    duration={5}
                                    delay={0}
                                    colorFrom='#7c3aed'
                                    colorTo='#0000'
                                    className='size-full opacity-0 transition-all group-hover:opacity-100'
                                />
                            </div>
                            <div className='group relative rounded-3xl border border-primary/30 bg-primary/5 text-card-foreground shadow-none'>
                                <div className='space-y-4 p-6'>
                                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                                        <TrendingUpDown className='text-primary' />
                                    </div>
                                    <h3 className='text-xl font-semibold'>Játék választék</h3>
                                    <p className='text-muted-foreground'>
                                        Válaszd ki a kedvenc témádat és játsz a barátaiddal vagy ismeretlenekkel is
                                        egyaránt.
                                    </p>
                                </div>
                                <BorderBeam
                                    size={250}
                                    duration={5}
                                    delay={0}
                                    colorFrom='#7c3aed'
                                    colorTo='#0000'
                                    className='size-full opacity-0 transition-all group-hover:opacity-100'
                                />
                            </div>
                            <div className='group relative rounded-3xl border border-primary/30 bg-primary/5 text-card-foreground shadow-none'>
                                <div className='space-y-4 p-6'>
                                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                                        <Swords className='text-primary' />
                                    </div>
                                    <h3 className='text-xl font-semibold'>Versenyképes</h3>
                                    <p className='text-muted-foreground'>
                                        Versenyezz a barátaiddal és mutasd meg a tudásod a világnak is egyaránt a
                                        ranglistán keresztül is megteheted ezt.
                                    </p>
                                </div>
                                <BorderBeam
                                    size={250}
                                    duration={5}
                                    delay={0}
                                    colorFrom='#7c3aed'
                                    colorTo='#0000'
                                    className='size-full opacity-0 transition-all group-hover:opacity-100'
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id='contact'>
                    <div className='rounded-t-[7rem] bg-gradient-to-b from-white/30 to-white/100 dark:from-black/30 dark:to-black/100'>
                        <div className='container relative mx-auto max-w-7xl px-4 py-16'>
                            <FadeText
                                className='flex items-center justify-center text-center text-lg font-semibold text-gray-500'
                                direction='down'
                                text='Kapcsolat'
                                framerProps={{
                                    show: { transition: { delay: 0.3 } },
                                }}
                                triggerOnView={true}
                            />
                            <div className='container mx-auto mt-12 grid h-full grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-8'>
                                <div className='rounded-lg border border-none bg-background text-card-foreground shadow-none'>
                                    <div className='space-y-4 p-6'>
                                        <h3 className='text-lg font-semibold'>Elérhetőségek</h3>
                                        <p className='text-muted-foreground'>
                                            Ha bármilyen kérdésed van, vagy segítségre van szükséged, keress minket
                                            bizalommal az alábbi elérhetőségeken.
                                        </p>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center gap-2'>
                                                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 p-1'>
                                                    <Phone className='text-primary' />
                                                </span>
                                                <span className='text-muted-foreground'>+36 30 123 4567</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 p-1'>
                                                    <Mail className='text-primary' />
                                                </span>
                                                <span className='text-muted-foreground'>
                                                    <a href='mailto:info@elmecsata.hu'>info@elmecsata.hu</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='rounded-lg border border-none bg-background text-card-foreground shadow-none'>
                                    <div className='space-y-4 p-6'>
                                        <h3 className='text-xl font-semibold'>Helyszín</h3>
                                        <p className='text-muted-foreground'>
                                            Az Elmecsata támogatói központja a következő címen található. Gyere el és
                                            nézd meg a helyszínt, ahol a tudás hatalom!
                                        </p>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center gap-2'>
                                                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 p-1'>
                                                    <MapPinHouse className='text-primary' />
                                                </span>
                                                <span className='text-muted-foreground'>
                                                    1234 Budapest, Kitalált utca 1.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className='relative bg-white/70 dark:bg-black/70'>
                    <hr />
                    <div className='mx-auto w-full max-w-screen-xl xl:pb-2'>
                        <div className='gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between'>
                            <div className='flex flex-col items-center md:items-start lg:flex-row'>
                                <Link href='/' className='size-52'>
                                    <Image
                                        src='/imgs/logo.png'
                                        className='w-full invert-0 dark:invert'
                                        alt='ElmeCsata'
                                        width={1920}
                                        height={1920}
                                    />
                                </Link>
                                <div id='creators' className='flex h-full flex-col items-start justify-center gap-2'>
                                    <Link
                                        href='/'
                                        className='group flex w-full items-center gap-2 rounded-full border p-2 px-4 text-sm leading-none text-gray-500 transition-all hover:border-red-500/20 hover:bg-red-500/15 dark:text-gray-400'
                                    >
                                        <Code className='h-6 w-6 transition-none group-hover:text-red-500' />
                                        <div className='flex flex-col'>
                                            <p className='translate-y-1/2 transition-all group-hover:translate-y-0'>
                                                Rostás András Péter
                                            </p>
                                            <p className='text-[0.6rem] text-red-500 opacity-0 group-hover:opacity-100'>
                                                {' '}
                                                | Projekt menedzser, fejlesztő
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href='/'
                                        className='group flex w-full items-center gap-2 rounded-full border p-2 px-4 text-sm leading-none text-gray-500 hover:border-blue-500/20 hover:bg-blue-500/15 dark:text-gray-400'
                                    >
                                        <Monitor className='size-6 transition-none group-hover:text-blue-500' />
                                        <div className='flex flex-col'>
                                            <p className='translate-y-1/2 transition-all group-hover:translate-y-0'>
                                                Digruber Emese
                                            </p>
                                            <p className='text-[0.6rem] text-blue-500 opacity-0 group-hover:opacity-100'>
                                                {' '}
                                                | Dizájner, lelki támasz, kapcsolattartó
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <hr className='my-10 block w-full md:my-0 md:hidden' />
                            </div>
                            <div className='grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10'>
                                <div>
                                    <h2 className='mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white'>
                                        Fontos
                                    </h2>
                                    <ul className='grid gap-2'>
                                        <li>
                                            <Link
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/create'
                                            >
                                                Kvíz létrehozása
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/profile'
                                            >
                                                Profil és kvízeim
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/docs.pdf'
                                            >
                                                Dokumentáció
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className='mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white'>
                                        Közösség
                                    </h2>
                                    <ul className='grid gap-2'>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/'
                                            >
                                                YouTube
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/'
                                            >
                                                Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/'
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className='mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white'>
                                        Szabályzatok
                                    </h2>
                                    <ul className='grid gap-2'>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/terms'
                                            >
                                                ÁSZF
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/privacy'
                                            >
                                                Adatvédelem
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200'
                                                href='/privacy'
                                            >
                                                Marketing szabályzat
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between'>
                            <div className='flex space-x-5 sm:mt-0 sm:justify-center'>
                                <Link
                                    href='/'
                                    className='text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                                >
                                    <DiscordLogoIcon className='h-6 w-6' />
                                </Link>
                            </div>
                            <span className='text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
                                © {new Date().getFullYear()} <Link href={'/'}>ElmeCsata</Link>. Minden jog fenntartva.
                            </span>
                        </div>
                    </div>
                    <DotPattern
                        className={cn('mt-1 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')}
                    />
                </footer>
            </div>
        </MainLayout>
    );
}
