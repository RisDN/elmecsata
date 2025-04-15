import { auth } from '@/app/auth';
import { QuestionEditor } from '@/app/components/box-container';
import { SidebarLayout } from '@/app/components/sidebarLayout';
import { Quiz } from '@elmecsata/types';
import { getQuizByIdAndCreatorId } from '@elmecsata/database';
import { redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: number }>;
}

const EditPage = async ({ params }: PageProps) => {
    const { id } = await params;

    const session = await auth();

    if (!session || !session.user) {
        return redirect('/');
    }

    if (!id) {
        return redirect('/');
    }
    const userId = parseInt(session.user.id as string);

    const quiz: Quiz | null = await getQuizByIdAndCreatorId(id, userId);

    if (!quiz) {
        return redirect('/');
    }

    return (
        <div className='absolute top-0 z-[-2] flex min-h-dvh w-screen select-none flex-col justify-center overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
            <SidebarLayout quiz={quiz} user={session.user}>
                <QuestionEditor quiz={quiz} />
            </SidebarLayout>
        </div>
    );
};

export default EditPage;
