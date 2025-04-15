import { Country } from '@elmecsata/types';
import { Question, QuestionOpnion, Quiz, QuizTag, RawQuiz } from '@elmecsata/types';
import { PrivacyType } from '@elmecsata/types';
import { eq } from 'drizzle-orm';
import { getCountryById, getCountryByName } from '../countries/countries';
import { db } from '../../mysql';
import { getQuizTagById } from '../quiztags/quiztags';
import { quizzes } from '../../schema';
import { unescape } from 'lodash';

export const createQuiz = async (
    creator: number,
    name: string,
    icon: string,
    banner: string,
    description: string,
    tags: QuizTag[],
    countryName: string,
    privacy: PrivacyType
) => {
    const country: Country = await getCountryByName(countryName);

    if (!country) {
        return null;
    }

    const quizTagsIds = tags.map((tag) => tag.id);
    const quiz = await db
        .insert(quizzes)
        .values({
            creator,
            name,
            icon,
            banner,
            description,
            tags: quizTagsIds,
            country: country.id,
            questions: [],
            played: 0,
            isPrivate: privacy === 'private' ? 1 : 0,
        })
        .execute();

    return quiz[0];
};


export const incrementQuizPlayed = async (quizId: number) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).execute();

    if (quiz.length === 0) {
        return false;
    }

    const set = await db
        .update(quizzes)
        .set({ played: quiz[0].played + 1 })
        .where(eq(quizzes.id, quizId))
        .execute();

    return set[0].affectedRows > 0;
};

export const isQuizNameExists = async (quizName: string) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.name, quizName)).execute();

    return quiz.length > 0;
};

export const isOwndedByUser = async (id: number, userId: number) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id)).execute();
    if (!quiz) {
        return false;
    }

    return quiz[0].creator === userId;
};

export const getAllQuizzesByPrivacy = async (isPrivate: PrivacyType): Promise<Quiz[]> => {
    const quizData = await db
        .select()
        .from(quizzes)
        .where(eq(quizzes.isPrivate, isPrivate === 'private' ? 1 : 0))
        .execute();

    return await formatQuizTypes(quizData);
};

export const getAllQuizzes = async (): Promise<Quiz[]> => {
    const quizData = await db.select().from(quizzes).execute();

    return await formatQuizTypes(quizData);
};

export const getQuizById = async (id: number): Promise<Quiz | null> => {
    const quizData = await db.select().from(quizzes).where(eq(quizzes.id, id)).execute();

    if (quizData.length === 0) {
        return null;
    }

    return (await formatQuizTypes(quizData))[0] as Quiz;
};

export const getQuizByIdAndCreatorId = async (id: number, creatorId: number): Promise<Quiz | null> => {
    const quizzesData = await getQuizzesByCreatorId(creatorId);
    const quiz = quizzesData.find((quiz) => quiz.id === Number(id));
    return quiz ?? null;
};

export const getQuizzesByCreatorId = async (creatorId: number): Promise<Quiz[]> => {
    const quizData = await db.select().from(quizzes).where(eq(quizzes.creator, creatorId));

    return await formatQuizTypes(quizData);
};

export const isExistsById = async (id: number) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id)).execute();

    return quiz.length > 0;
};

export const setQuizPrivacy = async (quizId: number, privacy: boolean) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).execute();

    if (quiz.length === 0) {
        return false;
    }

    const set = await db
        .update(quizzes)
        .set({ isPrivate: privacy ? 1 : 0 })
        .where(eq(quizzes.id, quizId))
        .execute();

    return set[0].affectedRows > 0;
};

export const updateQuizQuestions = async (quizId: number, questions: Question[]) => {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).execute();

    if (quiz.length === 0) {
        return false;
    }

    const set = await db
        .update(quizzes)
        .set({ questions: JSON.stringify(questions) })
        .where(eq(quizzes.id, quizId))
        .execute();

    return set[0].affectedRows > 0;
};

export const updateQuizInfo = async (
    quizId: number,
    name: string,
    description: string,
    banner: string,
    icon: string,
    countryId: number,
    privacy: PrivacyType
) => {
    const country: Country = await getCountryById(countryId);

    if (!country) {
        console.log("No country found");
        return false;
    }

    const set = await db
        .update(quizzes)
        .set({
            name,
            description,
            banner,
            icon,
            country: country.id,
            isPrivate: privacy === 'private' ? 1 : 0,
        })
        .where(eq(quizzes.id, quizId))
        .execute();
    console.log("set: ", set)
    return set[0].affectedRows > 0;
}

export const deleteQuiz = async (quizId: number) => {
    const quiz = await db.delete(quizzes).where(eq(quizzes.id, quizId)).execute();

    return quiz[0].affectedRows > 0;
};

const formatQuizTypes = async (quizData: RawQuiz[]): Promise<Quiz[]> => {
    const formattedQuizzes: Quiz[] = await Promise.all(
        quizData.map(async (quiz) => {
            const tagIds = JSON.parse(quiz.tags as string);
            const tags = await Promise.all(
                tagIds.map(async (tagId: number) => {
                    return await getQuizTagById(tagId);
                })
            );

            let questions: Question[] = [];

            try {
                const unescapedString = unescape(quiz.questions as string).trim();

                let parsedData = JSON.parse(unescapedString);

                if (typeof parsedData === 'string') {
                    parsedData = JSON.parse(parsedData);
                }

                if (!Array.isArray(parsedData)) {
                    throw new Error('Parsed questions is not an array: ' + JSON.stringify(parsedData));
                }

                questions = parsedData.map((q: any) => ({
                    id: q.id,
                    title: q.title,
                    content: q.content ?? undefined,
                    type: q.type,
                    duration: q.duration ?? 20,
                    answers: q.answers.map((a: any) => ({
                        id: a.id,
                        text: a.text,
                        isCorrect: a.isCorrect ?? undefined,
                    })) as QuestionOpnion[],
                })) as Question[];
            } catch (error) {
                throw new Error('Error while parsing questions: ' + error);
            }

            return {
                id: quiz.id,
                name: quiz.name,
                icon: quiz.icon,
                banner: quiz.banner,
                description: quiz.description,
                creator: quiz.creator,
                tags,
                country: quiz.country,
                isPrivate: !!quiz.isPrivate,
                questions,
                played: quiz.played,
                created_at: quiz.created_at as Date,
                updated_at: quiz.updated_at as Date,
            };
        })
    );
    return formattedQuizzes;
};
