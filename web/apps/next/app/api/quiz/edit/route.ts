import { auth } from '@/app/auth';
import { Quiz } from '@elmecsata/types';
import { updateQuizQuestions } from '@elmecsata/database';
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

    const { quizId, questions } = body;

    const quiz: Quiz | undefined = session.user.quizzes.find((quiz) => quiz.id === Number(quizId));

    if (!quiz) {
        return NextResponse.json({
            message: Messages.QuizEdit_Fail,
            success: false,
        });
    }

    const update = await updateQuizQuestions(quizId, questions);

    if (!update) {
        return NextResponse.json({
            message: Messages.QuizEdit_Fail,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.QuizEdit_Success,
        success: true,
    });
}
