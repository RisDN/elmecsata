import { getPassword, isUsernameFree } from '@elmecsata/database';
import { comparePasswords } from '@/lib/encryption/encryption';
import { Messages } from '@/lib/localization/messages';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { username, password } = body;

    if (await isUsernameFree(username)) {
        return NextResponse.json({
            message: Messages.Auth_UserNotFoundWithUsername,
            success: false,
        });
    }

    const hashedPassword = (await getPassword(username)) || '';

    if (!(await comparePasswords(password, hashedPassword))) {
        return NextResponse.json({
            message: Messages.Auth_PasswordWrong,
            success: false,
        });
    }

    return NextResponse.json({
        message: Messages.Auth_SuccessfullLogin,
        success: true,
    });
}
