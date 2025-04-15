import { Marquee } from '@/lib/ui/magicui/marquee';
import { getImageUrl } from '@/lib/utils';
import { getAllQuizzesByPrivacy, getUserById } from '@elmecsata/database';
import { Quiz } from '@elmecsata/types';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CreatorLink from './components/creator-link';
import TagsTooltip from './components/tags-tool-tip';

const PopularQuizzes = async () => {
    const quizzes: Quiz[] = await getAllQuizzesByPrivacy('public');

    const GamesCard = async (quiz: Quiz) => {
        let quizName = quiz.name;
        if (quiz.name.length > 15) {
            quizName = quiz.name.substring(0, 15) + '...';
        }

        const creator = await getUserById(quiz.creator);

        return (
            <div className='group mx-3 w-56 overflow-visible rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-black/50'>
                <div className='relative h-20'>
                    <div className='h-full w-full overflow-hidden rounded-t-xl bg-gradient-to-r from-zinc-900 to-zinc-950'>
                        {quiz?.banner && (
                            <Image
                                src={getImageUrl(quiz.banner) || '/placeholder.svg'}
                                alt={`${quiz.name} banner`}
                                width={288}
                                height={80}
                                className='h-full w-full object-cover'
                            />
                        )}
                    </div>
                    <div className='absolute -bottom-5 left-4 flex size-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 text-xl dark:border-zinc-900 dark:bg-zinc-950'>
                        {quiz?.icon ? (
                            <Image
                                src={getImageUrl(quiz.icon) || '/placeholder.svg'}
                                alt={`${quiz.name} icon`}
                                width={64}
                                height={64}
                                className='h-full w-full object-cover'
                            />
                        ) : (
                            <span className='text-gray-800 dark:text-gray-200'>{quiz?.name?.charAt(0) || '?'}</span>
                        )}
                    </div>
                </div>

                <div className='p-3 pt-6'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <h3 className='font-bold text-gray-800 dark:text-white'>
                                {quiz.name.length > 20 ? quiz.name.substring(0, 20) + '...' : quiz.name}
                            </h3>
                            <p className='mt-1 line-clamp-1 text-xs text-gray-600 dark:text-gray-300'>
                                {quiz.description || 'Nincs leírás'}
                            </p>
                        </div>
                    </div>

                    <div className='mt-2 text-[0.8rem]'>
                        Készítette: <CreatorLink username={creator?.username} />
                    </div>

                    <div className='mt-2 flex flex-wrap gap-1'>
                        {quiz.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag.id}
                                className={`relative rounded-full border px-1.5 py-0.5 text-xs border-${tag.color || 'gray-300'}`}
                            >
                                <span
                                    className={`absolute size-full bg-${tag.color || 'gray-300'} left-0 top-0 rounded-full opacity-30`}
                                ></span>
                                {tag.label}
                            </span>
                        ))}
                        {quiz.tags.length > 2 && <TagsTooltip tags={quiz.tags.slice(2)} />}
                    </div>

                    <div className='mt-2 flex items-center justify-end'>
                        <Link
                            href={`/quiz/${quiz.id}`}
                            className='flex items-center gap-1 text-sm font-medium text-blue-500 dark:text-blue-400'
                        >
                            <ExternalLink size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='relative flex w-full flex-col items-center justify-center overflow-hidden overflow-y-visible rounded-3xl'>
            <Marquee reverse pauseOnHover className='[--duration:20s]'>
                {quizzes.map((games) => (
                    <GamesCard key={games.id} {...games} />
                ))}
            </Marquee>
            <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background'></div>
            <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background'></div>
        </div>
    );
};

export default PopularQuizzes;
