'use client';

import { ModeToggle } from '@/app/ToggleThemeButton';
import { Messages } from '@/lib/localization/messages';
import { BackgroundBeams } from '@/lib/ui/background-beams';
import { Badge } from '@/lib/ui/badge';
import { Input } from '@/lib/ui/input';
import ShinyButton from '@/lib/ui/magicui/shiny-button';
import EditProfileModal from '@/lib/ui/originui/edit-modal';
import LogoutModal from '@/lib/ui/originui/logout-modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui/select';
import { cn, getImageUrl } from '@/lib/utils';
import { Quiz, QuizTag } from '@elmecsata/types';
import { DoorOpen, Search, Settings } from 'lucide-react';
import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthProvider } from '../providers/auth-provider';
import { useSocket } from '../providers/socket-provider';
import { DateFormatter } from './date-formatter';
import QuizCard from './quiz-card';

interface ProfileProps {
    isOwnProfile: boolean;
    user: User;
}

export default function ProfilePage({ isOwnProfile, user }: ProfileProps) {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<Quiz[]>(user.quizzes);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const allTags = Array.from(new Set(quizzes.flatMap((quiz) => quiz.tags).map((tag) => JSON.stringify(tag)))).map(
        (str) => JSON.parse(str)
    );

    useEffect(() => {
        if (user.quizzes.length === 0 && quizzes.length === 0) {
            setQuizzes(user.quizzes);
        }
    }, [user.quizzes, quizzes]);

    useEffect(() => {
        let filtered = [...quizzes];

        if (searchQuery) {
            filtered = filtered.filter(
                (quiz) =>
                    quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (privacyFilter !== 'all') {
            filtered = filtered.filter((quiz) => (privacyFilter === 'public' ? !quiz.isPrivate : quiz.isPrivate));
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter((quiz) => quiz.tags.some((tag) => selectedTags.includes(tag.id)));
        }

        setFilteredQuizzes(filtered);
    }, [quizzes, searchQuery, privacyFilter, selectedTags]);

    const togglePrivacy = async (quizId: string) => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        toast.remove();
        toast.loading(Messages.Loading);

        const response = await fetch('/api/quiz/quick-action/toggle-privacy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quizId }),
        });

        const data = await response.json();
        toast.remove();
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        setIsLoading(false);
        const quizIndex = quizzes.findIndex((q) => q.id.toString() === quizId);
        if (quizIndex === -1) return;

        const updatedQuizzes = [...quizzes];
        updatedQuizzes[quizIndex] = {
            ...updatedQuizzes[quizIndex],
            isPrivate: !quizzes[quizIndex].isPrivate,
        };

        setQuizzes(updatedQuizzes);
        toast.success(data.message);
    };

    const deleteQuiz = async (quizId: string) => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        toast.remove();
        toast.loading(Messages.Loading);

        const response = await fetch('/api/quiz/quick-action/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quizId }),
        });

        const data = await response.json();
        toast.remove();

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        setIsLoading(false);
        setQuizzes(quizzes.filter((q) => q.id.toString() !== quizId));
        toast.success(data.message);
    };

    const toggleTag = (tagId: number) => {
        setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
    };

    const { startGame } = useSocket();

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
                <div className='mb-8 flex items-center justify-end gap-5'>
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
                        {isOwnProfile ? 'Profilom' : `${user.username}'s profilja`}
                    </h1>
                </div>
                <div className='mb-8 rounded-3xl border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-gray-800 dark:bg-black/50'>
                    <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                        <div className='flex items-center justify-center sm:block'>
                            <div className='z-10 flex size-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-3xl dark:bg-primary/10 sm:size-32'>
                                <div className='flex size-full items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xl dark:border-zinc-900 dark:bg-zinc-950'>
                                    <Image
                                        src={getImageUrl(user.avatar) || '/placeholder.svg'}
                                        alt={`Profile picture`}
                                        width={1000}
                                        height={1000}
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-xl font-bold text-gray-800 dark:text-white'>{user.username}</h2>
                                {isOwnProfile && (
                                    <AuthProvider>
                                        <div className='flex gap-2'>
                                            <EditProfileModal user={user}>
                                                <button className='group/btn relative block h-10 px-2 font-medium text-zinc-950 transition-all hover:text-zinc-500 dark:text-zinc-100 hover:dark:text-zinc-500 sm:px-4'>
                                                    <Settings />
                                                </button>
                                            </EditProfileModal>
                                            <LogoutModal username={user.username}>
                                                <button className='group/btn relative block h-10 px-2 font-medium text-red-950 transition-all hover:text-red-500 dark:text-red-100 hover:dark:text-red-500 sm:px-4'>
                                                    <DoorOpen />
                                                </button>
                                            </LogoutModal>
                                        </div>
                                    </AuthProvider>
                                )}
                            </div>

                            <p className='mt-2 max-w-md truncate whitespace-pre-wrap break-words text-gray-600 dark:text-gray-300'>
                                {user.bio}
                            </p>

                            <div className='mt-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
                                <span className='text-sm text-gray-600 dark:text-gray-400'>
                                    <span className='font-semibold'>{quizzes.length}</span>{' '}
                                    {isOwnProfile ? 'kvízed van' : 'kvíz'}
                                </span>
                                <span className='hidden text-gray-400 dark:text-gray-600 sm:block'>•</span>
                                <span className='text-sm text-gray-600 dark:text-gray-400'>
                                    {isOwnProfile ? 'Csatlakoztál: ' : 'Csatlakozott'}{' '}
                                    <DateFormatter date={user.created_at} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-8 space-y-4 rounded-3xl border-gray-200 bg-white/50 p-8 backdrop-blur-sm dark:border-gray-800 dark:bg-black/50'>
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='relative flex-1'>
                            <Search
                                className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400'
                                size={20}
                            />
                            <Input
                                placeholder='Kezdj el gépelni a kereséshez...'
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                className='!mt-0 min-h-[none] resize-none border border-gray-500/30 bg-white/30 pe-14 pl-10 text-black hover:!border-primary/50 focus-visible:border-primary/50 focus-visible:ring-0 dark:border-input dark:bg-black/30 dark:text-white'
                            />
                        </div>
                        {isOwnProfile && (
                            <Select
                                value={privacyFilter}
                                onValueChange={(value: 'all' | 'public' | 'private') => setPrivacyFilter(value)}
                            >
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>Összes</SelectItem>
                                    <SelectItem value='public'>Publikusok</SelectItem>
                                    <SelectItem value='private'>Privátok</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {allTags.map((tag: QuizTag) => (
                            <Badge
                                key={tag.id}
                                variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                                className={cn(
                                    'cursor-pointer',
                                    `border ${selectedTags.includes(tag.id) ? `bg-${tag.color}` : ``} border-${tag.color} relative`
                                )}
                                onClick={() => toggleTag(tag.id)}
                            >
                                {tag.label}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {filteredQuizzes.length === 0 ? (
                        <div className='col-span-full flex flex-col gap-3 py-8 text-center text-gray-500 dark:text-gray-400'>
                            Nem található egy kvíz sem.
                            {isOwnProfile && quizzes.length === 0 && (
                                <Link href={'/create'}>
                                    <ShinyButton
                                        text='Hozz létre egyet!'
                                        className='bg-primary/15 font-bold text-black dark:bg-primary/30'
                                    />
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                isOwnProfile={isOwnProfile}
                                onTogglePrivacy={togglePrivacy}
                                onDelete={deleteQuiz}
                                startGame={startGame}
                                isLoading={isLoading}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className='fixed bottom-4 right-4 z-50'>
                <ModeToggle />
            </div>
        </div>
    );
}
