import { auth } from '@/app/auth';
import { Quiz } from '@elmecsata/types';
import { setQuizPrivacy } from '@elmecsata/database';
import { Messages } from '@/lib/localization/messages';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({
            message: Messages.Unauthorized,
            success: false,
        });
    }

    const { quizId } = body;

    const quiz: Quiz | undefined = session.user.quizzes.find((quiz) => quiz.id === Number(quizId));

    if (!quiz) {
        return NextResponse.json({
            message: Messages.QuizQuickAction_TogglePrivacy_Fail,
            success: false,
        });
    }

    const newPrivacy = !quiz.isPrivate;

    const set = await setQuizPrivacy(quizId, newPrivacy);

    if (!set) {
        return NextResponse.json({
            message: Messages.QuizQuickAction_TogglePrivacy_Fail,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.QuizQuickAction_TogglePrivacy_Success.replace(
            '%new_value%',
            newPrivacy ? 'privát' : 'publikus'
        ),
        success: true,
    });
}
