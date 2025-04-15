export interface Quiz {
    id: number;
    name: string;
    icon: string;
    banner: string;
    description: string;
    creator: number;
    tags: QuizTag[];
    country: number;
    isPrivate: boolean;
    questions: any[];
    played: number;
    created_at: Date;
    updated_at: Date;
}

export interface RawQuiz {
    id: number;
    name: string;
    icon: string;
    banner: string;
    description: string;
    creator: number;
    tags: unknown;
    country: number;
    isPrivate: number;
    questions: unknown;
    played: number;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface Question {
    id: string;
    title: string;
    content?: string;
    type: QuestionType;
    answers: QuestionOpnion[];
    duration: number;
}

export interface QuestionOpnion {
    id: string;
    text: string;
    isCorrect?: boolean;
}

export interface QuizTag {
    id: number;
    value: string;
    label: string;
    color: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'puzzle' | 'quiz' | 'poll' | 'slide';
export type PrivacyType = 'public' | 'private';
