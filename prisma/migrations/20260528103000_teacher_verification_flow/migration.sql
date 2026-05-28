CREATE TYPE "TeacherVerificationStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED');

ALTER TABLE "User"
ADD COLUMN "teacherVerificationStatus" "TeacherVerificationStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN "teacherVerificationRequestedAt" TIMESTAMP(3),
ADD COLUMN "teacherVerificationApprovedAt" TIMESTAMP(3);
