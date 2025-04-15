import ProfilePage from '@/app/components/profile-page';
import { getUser } from '@elmecsata/database';
import { User } from 'next-auth';
import { redirect } from 'next/navigation';

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

const ProfilePageByUsername = async ({ params }: ProfilePageProps) => {
    const { username } = await params;

    if (!username) {
        return redirect('/');
    }

    const user: User | null | undefined = (await getUser(username)) as unknown as User;

    if (!user) {
        return redirect('/');
    }

    const quizzes = user.quizzes.filter((quiz) => quiz.isPrivate === false);
    user.quizzes = quizzes;

    return <ProfilePage user={user} isOwnProfile={false} />;
};

export default ProfilePageByUsername;
