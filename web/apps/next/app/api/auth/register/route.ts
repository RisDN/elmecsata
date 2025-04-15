import { createUser, isUsernameFree } from '@elmecsata/database';
import { hash } from '@/lib/encryption/encryption';
import { Messages } from '@/lib/localization/messages';
import { validatePassword } from '@/lib/validations/password';
import { validateUsername } from '@/lib/validations/username';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { username, password, avatarUrl } = body;

    if (!validateUsername(username)) {
        return NextResponse.json({
            message: Messages.Auth_UsernameWrongFormat,
            success: false,
        });
    }

    if (!validatePassword(password)) {
        return NextResponse.json({
            message: Messages.Auth_PasswordWrongFormat,
            success: false,
        });
    }

    if (avatarUrl === undefined) {
        return NextResponse.json({
            message: Messages.Auth_UploadProfileAvatar,
            success: false,
        });
    }

    if (!(await isUsernameFree(username))) {
        return NextResponse.json({
            message: Messages.Auth_UserNameAlreadyTaken,
            success: false,
        });
    }

    const hashedPassword = await hash(password);

    if (hashedPassword === null) {
        return NextResponse.json({
            message: Messages.Auth_ErrorWhileRegistering,
            success: false,
        });
    }

    if (!(await createUser(username, hashedPassword, avatarUrl))) {
        return NextResponse.json({
            message: Messages.Auth_ErrorWhileRegistering,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.Auth_SuccessfullRegister,
        success: true,
    });
}
