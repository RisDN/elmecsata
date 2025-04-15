import { QuizTag } from '@elmecsata/types';
import { db } from '../../mysql';
import { quizTags } from '../../schema';
import { inArray } from 'drizzle-orm';

export const getQuizTags = async () => {
    const data = await db.select().from(quizTags);

    return data as QuizTag[];
};

export const getQuizTagById = async (id: number) => {
    const data = await db
        .select()
        .from(quizTags)
        .where(inArray(quizTags.id, [id]));

    return data[0] as QuizTag;
};
