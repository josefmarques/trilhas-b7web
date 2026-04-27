CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "createAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "updateAt" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updateAt" timestamp;