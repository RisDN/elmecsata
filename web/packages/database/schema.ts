import { relations } from 'drizzle-orm';
import { int, json, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

const users = mysqlTable('users', {
    id: int('user_id').autoincrement().primaryKey(),
    username: varchar('username', { length: 15 }).notNull(),
    password: varchar('password', { length: 60 }).notNull(),
    bio: varchar('bio', { length: 100 }).notNull(),
    avatar: varchar('avatar', { length: 48 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

const quizzes = mysqlTable('quizzes', {
    id: int('quiz_id').autoincrement().primaryKey(),
    name: varchar('name', { length: 30 }).notNull(),

    icon: varchar('icon', { length: 48 }).notNull(),
    banner: varchar('banner', { length: 48 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),

    creator: int('creator')
        .notNull()
        .references(() => users.id),

    tags: json('tags').notNull(),
    country: int('country')
        .notNull()
        .references(() => countries.id),

    isPrivate: int('isPrivate').notNull(),

    questions: json('questions').notNull(),
    played: int('played').notNull(),

    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

const quizTags = mysqlTable('quiz_tags', {
    id: int('quiz_tag_id').autoincrement().primaryKey(),
    value: varchar('tag', { length: 50 }).notNull(),
    label: varchar('label', { length: 50 }).notNull(),
    color: varchar('color', { length: 50 }).notNull(),
});

const countries = mysqlTable('countries', {
    id: int('country_id').autoincrement().primaryKey(),
    continent: int('continent')
        .notNull()
        .references(() => continents.id),
    country: varchar('country', { length: 20 }).notNull(),
    countryCode: varchar('country_code', { length: 2 }).notNull(),
});

const continents = mysqlTable('continents', {
    id: int('continent_id').autoincrement().primaryKey(),
    continent: varchar('continent', {
        length: 20,
        enum: ['Amerika', 'Európa', 'Ázsia', 'Afrika', 'Óceánia'],
    }).notNull(),
});

const countriesRelations = relations(countries, ({ many }) => {
    return {
        quizzes: many(quizzes),
    };
});

const continentsRelations = relations(continents, ({ many }) => {
    return {
        countries: many(countries),
    };
});

const usersRelations = relations(users, ({ many }) => {
    return {
        quizzes: many(quizzes),
    };
});

export { quizzes, users, usersRelations, countries, countriesRelations, continents, continentsRelations, quizTags };
