-- Alignment migration for schema changes that already exist in the local database.
-- This keeps migration history consistent without resetting or deleting data.

ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'USER';

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "clerkId" TEXT,
ADD COLUMN IF NOT EXISTS "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "mustChangePassword" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "users"
ALTER COLUMN "passwordHash" SET DEFAULT 'clerk-managed';

CREATE UNIQUE INDEX IF NOT EXISTS "users_clerkId_key" ON "users"("clerkId");

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "actorUserId" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "audit_logs_actorUserId_idx" ON "audit_logs"("actorUserId");
CREATE INDEX IF NOT EXISTS "audit_logs_resourceType_resourceId_idx" ON "audit_logs"("resourceType", "resourceId");
CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs"("action");
CREATE INDEX IF NOT EXISTS "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

CREATE TABLE IF NOT EXISTS "api_access_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_access_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "api_access_logs_path_idx" ON "api_access_logs"("path");
CREATE INDEX IF NOT EXISTS "api_access_logs_userId_idx" ON "api_access_logs"("userId");
CREATE INDEX IF NOT EXISTS "api_access_logs_createdAt_idx" ON "api_access_logs"("createdAt");
