ALTER TABLE "users" ALTER COLUMN "is_admin" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;
UPDATE "users" SET "is_admin" = false WHERE "is_admin" IS NULL;