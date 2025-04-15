CREATE TABLE `continents` (
	`continent_id` int AUTO_INCREMENT NOT NULL,
	`continent` varchar(20) NOT NULL,
	CONSTRAINT `continents_continent_id` PRIMARY KEY(`continent_id`)
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`country_id` int AUTO_INCREMENT NOT NULL,
	`continent` int NOT NULL,
	`country` varchar(20) NOT NULL,
	`country_code` varchar(2) NOT NULL,
	CONSTRAINT `countries_country_id` PRIMARY KEY(`country_id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_tags` (
	`quiz_tag_id` int AUTO_INCREMENT NOT NULL,
	`tag` varchar(50) NOT NULL,
	`label` varchar(50) NOT NULL,
	`color` varchar(50) NOT NULL,
	CONSTRAINT `quiz_tags_quiz_tag_id` PRIMARY KEY(`quiz_tag_id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`quiz_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30) NOT NULL,
	`icon` varchar(48) NOT NULL,
	`banner` varchar(48) NOT NULL,
	`description` varchar(255) NOT NULL,
	`creator` int NOT NULL,
	`tags` json NOT NULL,
	`country` int NOT NULL,
	`isPrivate` int NOT NULL,
	`questions` json NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quizzes_quiz_id` PRIMARY KEY(`quiz_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(15) NOT NULL,
	`password` varchar(60) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `countries` ADD CONSTRAINT `countries_continent_continents_continent_id_fk` FOREIGN KEY (`continent`) REFERENCES `continents`(`continent_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_creator_users_user_id_fk` FOREIGN KEY (`creator`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_country_countries_country_id_fk` FOREIGN KEY (`country`) REFERENCES `countries`(`country_id`) ON DELETE no action ON UPDATE no action;