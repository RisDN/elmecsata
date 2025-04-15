'use client';

import { ModeToggle } from '@/app/ToggleThemeButton';
import CreatorLink from '@/app/components/creator-link';
import { DateFormatter } from '@/app/components/date-formatter';
import ShapeIcon, { answerShapes } from '@/app/components/shape-icons';
import { useSocket } from '@/app/providers/socket-provider';
import { BackgroundBeams } from '@/lib/ui/background-beams';
import { Badge } from '@/lib/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/card';
import ShinyButton from '@/lib/ui/magicui/shiny-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/ui/tabs';
import { getImageUrl } from '@/lib/utils';
import type { Question, QuestionOpnion, Quiz } from '@elmecsata/types';
import { Clock, Eye, User as UserIcon } from 'lucide-react';
import type { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface QuizDetailPageProps {
    quiz: Quiz;
    creator: User;
}

export default function QuizDetailPage({ quiz, creator }: QuizDetailPageProps) {
    const { startGame } = useSocket();
    const [isStarting, setIsStarting] = useState(false);

    const handleStartGame = async () => {
        startGame(quiz.id.toString());
        setIsStarting(true);
    };

    return (
        <div className='min-h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
            <div className='-z-10 hidden sm:block'>
                <BackgroundBeams className='-z-10' />
            </div>
            <Link href='/' className='group' prefetch={false}>
                <div className='fixed left-0 top-0 z-50 flex items-center gap-2 rounded-br-xl bg-white/50 px-4 py-2 backdrop-blur-sm dark:bg-black/30'>
                    <Image src='/imgs/logo.png' alt='ElmeCsata' width={40} height={40} />
                    <h1 className='hidden text-xl font-bold text-black dark:text-white sm:flex'>Elmecsata</h1>
                </div>
            </Link>

            <div className='container !z-10 mx-auto min-h-screen px-4 py-8'>
                <div className='mb-8 flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Kvíz részletei</h1>
                </div>

                <div className='mb-8 overflow-hidden rounded-3xl border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-black/50'>
                    <div className='relative h-48 w-full overflow-hidden sm:h-64'>
                        <Image
                            src={getImageUrl(quiz.banner) || '/placeholder.svg?height=400&width=1200'}
                            alt={quiz.name}
                            width={1200}
                            height={400}
                            className='h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                        <div className='absolute bottom-0 left-0 flex w-full items-end p-6'>
                            <div className='mr-4 flex size-16 items-center justify-center overflow-hidden rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm sm:size-20'>
                                <Image
                                    src={getImageUrl(quiz.icon) || '/placeholder.svg?height=80&width=80'}
                                    alt={`${quiz.name} icon`}
                                    width={80}
                                    height={80}
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-white sm:text-3xl'>{quiz.name}</h2>
                                <div className='mt-2 flex flex-wrap gap-2'>
                                    {quiz.tags.map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            className={`border border-${tag.color} bg-${tag.color}/20 hover:bg-black/30`}
                                        >
                                            {tag.label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-6'>
                        <div className='mb-4 flex flex-wrap items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <UserIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                                <span className='text-sm text-gray-600 dark:text-gray-300'>
                                    Készítette: <CreatorLink username={creator.username ?? undefined} />
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Eye className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                                <span className='text-sm text-gray-600 dark:text-gray-300'>{quiz.played} játszás</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Clock className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                                <span className='text-sm text-gray-600 dark:text-gray-300'>
                                    Létrehozva: <DateFormatter date={quiz.created_at} />
                                </span>
                            </div>
                        </div>

                        <p className='mb-6 whitespace-pre-wrap text-gray-700 dark:text-gray-300'>{quiz.description}</p>

                        <div className='flex flex-col gap-4 sm:flex-row'>
                            {quiz.questions.length > 0 && (
                                <ShinyButton
                                    onClick={handleStartGame}
                                    disabled={isStarting}
                                    className='flex items-center justify-center gap-2 bg-primary/15 font-bold text-black dark:bg-primary/30 dark:text-white'
                                    text={isStarting ? 'Játék indítása...' : 'Játék indítása'}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-8 rounded-3xl border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-black/50'>
                    <Tabs defaultValue='questions'>
                        <TabsList className='mb-4 grid w-full grid-cols-2'>
                            <TabsTrigger value='questions'>Kérdések ({quiz.questions.length})</TabsTrigger>
                            <TabsTrigger value='info'>Játék információk</TabsTrigger>
                        </TabsList>

                        <TabsContent value='questions'>
                            <div className='space-y-4'>
                                {quiz.questions.map((question: Question, index) => (
                                    <Card key={question.id} className='overflow-hidden border-none shadow-md'>
                                        <CardHeader className='bg-primary/10 pb-2'>
                                            <div className='flex items-center justify-between'>
                                                <Badge variant='outline' className='px-2 py-1'>
                                                    {index + 1}. kérdés
                                                </Badge>
                                                <Badge
                                                    variant='outline'
                                                    className='flex items-center gap-1 bg-transparent/10 px-2 py-1'
                                                >
                                                    <Clock className='h-4 w-4' />
                                                    {question.duration} mp
                                                </Badge>
                                            </div>
                                            <CardTitle className='text-xl'>{question.title}</CardTitle>
                                            {question.content && <CardDescription>{question.content}</CardDescription>}
                                        </CardHeader>
                                        <CardContent className='pt-4'>
                                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                                                {(question.answers as QuestionOpnion[]).map((answer, answerIndex) => {
                                                    if (answerIndex >= 6) return null;

                                                    return (
                                                        <div
                                                            key={answer.id}
                                                            className='relative overflow-hidden rounded-xl border'
                                                        >
                                                            <div
                                                                className={`flex h-16 items-center gap-4 p-4 ${answerShapes[answerIndex].color}`}
                                                            >
                                                                <div className='absolute inset-0 bg-white/80 dark:bg-black/80'></div>
                                                                <div className='relative z-10 flex w-full items-center gap-3'>
                                                                    <ShapeIcon color={answerShapes[answerIndex].color} shape={answerShapes[answerIndex].shape} />
                                                                    <span className='font-medium'>{answer.text}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value='info'>
                            <Card>
                                <CardContent className='pt-6'>
                                    <div className='space-y-4'>
                                        <div>
                                            <h3 className='mb-2 font-semibold'>Hogyan játssz?</h3>
                                            <p className='text-sm text-muted-foreground'>
                                                Indítsd el a játékot a &quot;Játék indítása&quot; gombbal. Ezután kapsz
                                                egy játékkódot, amit megoszthatsz a barátaiddal, hogy csatlakozhassanak
                                                a kvízhez. A játékosok a kódot a főoldalon található
                                                &quot;Csatlakozás&quot; mezőbe írhatják be.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className='mb-2 font-semibold'>Pontozás</h3>
                                            <p className='text-sm text-muted-foreground'>
                                                Minden helyes válasz után pontokat kapsz. Minél gyorsabban válaszolsz,
                                                annál több pontot szerezhetsz. A helytelen válaszokért nem jár pont.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className='mb-2 font-semibold'>Kvíz statisztikák</h3>
                                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                                <li>Kérdések száma: {quiz.questions.length}</li>
                                                <li>
                                                    Átlagos időkorlát:{' '}
                                                    {Math.round(
                                                        quiz.questions.reduce((acc, q) => acc + q.duration, 0) /
                                                        quiz.questions.length
                                                    )}{' '}
                                                    másodperc
                                                </li>
                                                <li>Eddigi játékok: {quiz.played}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div className='fixed bottom-4 right-4 z-50'>
                <ModeToggle />
            </div>
        </div>
    );
}
