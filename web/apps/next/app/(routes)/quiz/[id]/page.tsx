import { getQuizById, getUserById } from '@elmecsata/database';
import type { Quiz } from '@elmecsata/types';
import type { User } from 'next-auth';
import { redirect } from 'next/navigation';
import QuizDetailPage from './quiz-detail-page';

interface QuizPageProps {
    params: Promise<{ id: number }>;
}

const QuizPage = async ({ params }: QuizPageProps) => {
    const { id } = await params;

    if (!id || isNaN(id)) {
        return redirect('/');
    }

    const quiz: Quiz | null = await getQuizById(id);

    if (!quiz) {
        return redirect('/');
    }

    const creator: User | null = (await getUserById(quiz.creator)) as unknown as User;
    console.log(creator);
    if (!creator) {
        return redirect('/');
    }

    return <QuizDetailPage quiz={quiz} creator={creator} />;
};

export default QuizPage;
