import { auth } from '@/app/auth';
import { deleteUser } from '@elmecsata/database';
import { Messages } from '@/lib/localization/messages';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({
            message: Messages.Unauthorized,
            success: false,
        });
    }

    const userId = parseInt(session.user.id as string);

    if (!(await deleteUser(userId))) {
        return NextResponse.json({
            message: Messages.ProfileEdit_DeletionFail,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.ProfileEdit_Deleted,
        success: true,
    });
}
