import { auth } from '@/app/auth';
import ProfilePage from '@/app/components/profile-page';
import { redirect } from 'next/navigation';

const OwnProfilePage = async () => {
    const session = await auth();

    if (!session || !session.user) {
        return redirect('/');
    }

    return <ProfilePage user={session.user} isOwnProfile />;
};

export default OwnProfilePage;
