import { auth } from '@/app/auth';
import { createQuiz, isQuizNameExists } from '@elmecsata/database';
import { Messages } from '@/lib/localization/messages';
import { User } from 'next-auth';
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

    const { name, icon, banner, description, quizTags, country, privacy } = body;

    if (!name || !description) {
        return NextResponse.json({
            message: Messages.QuizCreation_PleaseFillAllFields,
            success: false,
        });
    }

    if (await isQuizNameExists(name)) {
        return NextResponse.json({
            message: Messages.QuizCreation_QuizNameAlreadyExists,
            success: false,
        });
    }

    const user: User = session.user;

    const userId = parseInt(user.id as string);

    const createdQuiz = await createQuiz(userId, name, icon, banner, description, quizTags, country, privacy);

    if (createdQuiz === null) {
        return NextResponse.json({
            message: Messages.QuizCreation_ErrorWhileCreatingQuiz,
            success: false,
        });
    }

    if (createdQuiz.affectedRows == 0) {
        return NextResponse.json({
            message: Messages.QuizCreation_ErrorWhileCreatingQuiz,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.QuizCreation_SuccessfullQuizCreation,
        success: true,
        id: createdQuiz.insertId,
    });
}
