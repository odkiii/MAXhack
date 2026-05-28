ALTER TABLE "User" ADD COLUMN "roleSelectedAt" TIMESTAMP(3);

UPDATE "User" AS u
SET "roleSelectedAt" = COALESCE(
  (SELECT c."acceptedAt" FROM "Consent" AS c WHERE c."userId" = u."id"),
  u."createdAt"
)
WHERE u."teacherVerificationStatus" IN ('APPROVED', 'PENDING')
   OR EXISTS (SELECT 1 FROM "Consent" AS c WHERE c."userId" = u."id");
