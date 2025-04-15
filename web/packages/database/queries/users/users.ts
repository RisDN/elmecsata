import { and, eq } from 'drizzle-orm';
import { db } from '../../mysql';
import { getQuizzesByCreatorId } from '../quiz/quiz';
import { quizzes, users } from '../../schema';
import { getRandomBio } from './default-bios';

export const isUsernameFree = async (username: string) => {
    const user = await db
        .select()
        .from(users)
        .where(and(eq(users.username, username)))
        .execute();
    return user.length === 0;
};

export const createUser = async (username: string, password: string, avatarUrl: string): Promise<boolean> => {
    const user = await db.insert(users).values({
        username,
        password,
        avatar: avatarUrl,
        bio: getRandomBio(username),
    });

    return user != null;
};

export const getUserById = async (userId: number) => {
    const user = await db.select().from(users).where(eq(users.id, userId)).execute();

    if (user.length === 0) {
        return null;
    }

    return user[0];
};

export const getUser = async (username: string) => {
    const user = await db
        .select()
        .from(users)
        .where(and(eq(users.username, username)))
        .execute();

    if (user.length === 0) {
        return null;
    }

    const userObj = user[0];

    if (typeof userObj.id !== 'number') {
        return;
    }

    const quizzes = await getQuizzesByCreatorId(userObj.id);

    return {
        ...userObj,
        quizzes,
    };
};

export const getPassword = async (username: string) => {
    const user = await db.select().from(users).where(eq(users.username, username)).execute();

    return user.length > 0 ? user[0].password : null;
};

export const deleteUser = async (userId: number) => {
    const deleteQuizes = await db.delete(quizzes).where(eq(quizzes.creator, userId)).execute();
    const deleteUser = await db.delete(users).where(eq(users.id, userId)).execute();

    return deleteQuizes[0].affectedRows !== 0 && deleteUser[0].affectedRows !== 0;
};

export const updateUserAvatar = async (userId: number, avatarUrl: string) => {
    const user = await db.update(users).set({ avatar: avatarUrl }).where(eq(users.id, userId)).execute();

    return user[0].affectedRows !== 0;
};

export const updateUserPassword = async (userId: number, password: string) => {
    const user = await db.update(users).set({ password }).where(eq(users.id, userId)).execute();

    return user[0].affectedRows !== 0;
};

export const updateUserBio = async (userId: number, bio: string) => {
    const user = await db.update(users).set({ bio }).where(eq(users.id, userId)).execute();

    return user[0].affectedRows !== 0;
};
