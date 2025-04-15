/* eslint-disable @next/next/no-img-element */
import { Quiz, QuizTag } from '@elmecsata/types';
import QuizDeleteModal from '@/lib/ui/originui/quiz-delete-modal';
import { getImageUrl } from '@/lib/utils';
import { Edit, ExternalLink, Eye, EyeOff, MonitorPlayIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { DateFormatter } from './date-formatter';

interface QuizCardProps {
    quiz: Quiz;
    isOwnProfile: boolean;
    onTogglePrivacy: (id: string) => void;
    onDelete: (id: string) => void;
    startGame: (id: string) => void;
    isLoading: boolean;
}

export default function QuizCard({
    quiz,
    isOwnProfile,
    onTogglePrivacy,
    onDelete,
    isLoading,
    startGame,
}: QuizCardProps) {
    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-black/50'>
            <div className='relative h-24'>
                <div className='h-full w-full overflow-hidden bg-gradient-to-r from-zinc-900 to-zinc-950'>
                    {quiz?.banner && (
                        <img
                            src={getImageUrl(quiz.banner) || '/placeholder.svg'}
                            alt={`${quiz.name} banner`}
                            className='h-full w-full object-cover'
                        />
                    )}
                </div>
                <div className='absolute -bottom-6 left-4 flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 text-xl dark:border-zinc-900 dark:bg-zinc-950'>
                    {quiz?.icon ? (
                        <img
                            src={getImageUrl(quiz.icon) || '/placeholder.svg'}
                            alt={`${quiz.name} icon`}
                            className='h-full w-full object-cover'
                        />
                    ) : (
                        quiz?.name?.charAt(0) || '?'
                    )}
                </div>
            </div>

            <div className='p-4 pt-8'>
                <div className='flex items-start justify-between'>
                    <div>
                        <h3 className='font-bold text-gray-800 dark:text-white'>{quiz.name}</h3>
                        <p className='mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300'>{quiz.description}</p>
                    </div>

                    {isOwnProfile && (
                        <div className='flex gap-1'>
                            <button
                                onClick={() => onTogglePrivacy(quiz.id.toString())}
                                className='rounded-md p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                title={quiz.isPrivate ? 'Publikussá tétel' : 'Priváttá tétel'}
                                disabled={isLoading}
                            >
                                {quiz.isPrivate ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <Link
                                href={`/edit/${quiz.id}`}
                                className='rounded-md p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                title='Szerkesztés'
                            >
                                <Edit size={18} />
                            </Link>

                            <button
                                onClick={() => startGame(quiz.id.toString())}
                                className='rounded-md p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                title='Játék indítása'
                                disabled={isLoading}
                            >
                                <MonitorPlayIcon size={18} className='text-green-600' />
                            </button>

                            <QuizDeleteModal quiz={quiz} handleDelete={() => onDelete(quiz.id.toString())}>
                                <button
                                    className='rounded-md p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                    title='Törlés'
                                    disabled={isLoading}
                                >
                                    <Trash2 size={18} className='text-red-600' />
                                </button>
                            </QuizDeleteModal>
                        </div>
                    )}
                </div>

                <div className='mt-3 flex flex-wrap gap-2'>
                    {quiz.tags.map((tag: QuizTag) => (
                        <span
                            key={tag.id}
                            className={`relative rounded-full border px-2 py-1 text-xs border-${tag.color}`}
                        >
                            <span
                                className={`absolute size-full bg-${tag.color} left-0 top-0 rounded-full opacity-30`}
                            ></span>
                            {tag.label}
                        </span>
                    ))}
                </div>

                <div className='mt-4 flex items-center justify-between'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                        Készült: <DateFormatter date={quiz.created_at} />
                    </span>
                    <Link
                        href={`/quiz/${quiz.id}`}
                        className='flex items-center gap-1 text-sm font-medium text-blue-500 dark:text-blue-400'
                    >
                        Megtekintés <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
