import { auth } from '@/app/auth';
import { PrivacyType, Quiz } from '@elmecsata/types';
import { isQuizNameExists, updateQuizInfo, updateQuizQuestions } from '@elmecsata/database';
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

    const { id, name, description, banner, icon, country, privacy } = body;

    const quiz: Quiz | undefined = session.user.quizzes.find((quiz) => quiz.id === Number(id));

    if (!quiz) {
        return NextResponse.json({
            message: Messages.QuizEdit_Fail,
            success: false,
        });
    }

    if (name !== quiz.name && (!name || name === '')) {
        if (await isQuizNameExists(name)) {
            return NextResponse.json({
                message: Messages.QuizCreation_QuizNameAlreadyExists,
                success: false,
            });
        }
    }

    const privacyType: PrivacyType = privacy as PrivacyType;

    const update = await updateQuizInfo(id, name, description, banner, icon, country, privacyType);

    if (!update) {
        console.log('Update failed');
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
