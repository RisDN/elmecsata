import { getQuizzesByCreatorId } from '@elmecsata/database';
import { getUser } from '@elmecsata/database';
import { comparePasswords } from '@/lib/encryption/encryption';
import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Quiz } from '@elmecsata/types';

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: 'Bejelentkezés e-mail/jelszó párossal',
            credentials: {
                username: {
                    label: 'E-mail cím',
                    type: 'text',
                    placeholder: 'pl. jancsi@gmail.com',
                },
                password: {
                    label: 'Jelszó',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const { username, password } = credentials ?? {};

                if (!username || !password) {
                    return null;
                }

                const user = (await getUser(username as string)) as User | undefined;

                if (!user) {
                    return null;
                }

                if (!(await comparePasswords(password.toString(), user.password))) {
                    return null;
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async session({ session, token }: { session: Session; token: any }) {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.password = token.password;
            session.user.bio = token.bio;
            session.user.avatar = token.avatar;
            session.user.created_at = token.created_at;
            session.user.updated_at = token.updated_at;
            const quizzes: Quiz[] = await getQuizzesByCreatorId(token.id);
            session.user.quizzes = quizzes;
            return session;
        },

        async jwt({ token, trigger, user, session }: any) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.password = user.password;
                token.bio = user.bio;
                token.avatar = user.avatar;
                token.created_at = user.created_at;
                token.updated_at = user.updated_at;
                const quizzes: Quiz[] = await getQuizzesByCreatorId(user.id);
                token.quizzes = quizzes;
            }
            if (trigger === 'update') {
                token.password = session.password;
                token.avatar = session.avatar;
                token.bio = session.bio;
            }

            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
