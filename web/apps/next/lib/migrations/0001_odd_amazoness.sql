DO $$ BEGIN
 CREATE TYPE "public"."quiz_types" AS ENUM('true_false', 'multiple_choice', 'order_list');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiple_choice_questions" (
	"question_id" integer NOT NULL,
	"choice" varchar(255) NOT NULL,
	"is_correct" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ordering_questions" (
	"question_id" integer NOT NULL,
	"choice" varchar(255) NOT NULL,
	"correct_order" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_questions" (
	"quiz_questions_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"question" varchar(255) NOT NULL,
	"image" varchar(48),
	"type" "quiz_types" NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "true_false_questions" (
	"question_id" integer NOT NULL,
	"is_true" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "forms" RENAME TO "quizzes";--> statement-breakpoint
ALTER TABLE "quizzes" DROP CONSTRAINT "forms_creator_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quizzes" ADD COLUMN "quiz_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzes" ADD COLUMN "banner" varchar(48) NOT NULL;--> statement-breakpoint
ALTER TABLE "quizzes" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiple_choice_questions" ADD CONSTRAINT "multiple_choice_questions_question_id_quiz_questions_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("quiz_questions_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordering_questions" ADD CONSTRAINT "ordering_questions_question_id_quiz_questions_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("quiz_questions_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_quizzes_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "true_false_questions" ADD CONSTRAINT "true_false_questions_question_id_quiz_questions_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("quiz_questions_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_creator_users_user_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quizzes" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "quizzes" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";