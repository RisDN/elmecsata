import { DefaultSession, DefaultUser } from 'next-auth';
import { Social, Upload } from './user';
import { DefaultJWT } from 'next-auth/jwt';
import { Quiz } from './quiz';

declare module 'next-auth' {
    interface User {
        id: number;
        username: string;
        password: string;
        bio: string;
        avatar: string;
        created_at: Date;
        updated_at: Date;
        quizzes: Quiz[];
    }

    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
        iat?: number;
        exp?: number;
        jti?: string;
    }
}

export { User, JWT, Session };
