import { auth } from '@/app/auth';
import { updateUserAvatar, updateUserBio, updateUserPassword } from '@elmecsata/database';
import { hash } from '@/lib/encryption/encryption';
import { Messages } from '@/lib/localization/messages';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { newPassword, newPasswordAgain, bio, avatarKey } = body;

    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({
            message: Messages.Unauthorized,
            success: false,
        });
    }

    const userId = parseInt(session.user.id as string);

    if (session.user.bio !== bio) {
        await updateUserBio(userId, bio);
    }

    if (session.user.avatar !== avatarKey) {
        await updateUserAvatar(userId, avatarKey);
    }

    if (newPassword !== '' && newPassword === newPasswordAgain) {
        const hashedPassword = await hash(newPassword);

        if (!hashedPassword) {
            return NextResponse.json({
                message: Messages.ProfileEdit_ErrorWhileEditing,
                success: false,
            });
        }

        await updateUserPassword(userId, hashedPassword);
    }

    return NextResponse.json({
        message: Messages.ProfileEdit_SuccessfullEdit,
        success: true,
    });
}
