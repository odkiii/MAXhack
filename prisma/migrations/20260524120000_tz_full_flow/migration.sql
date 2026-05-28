CREATE TYPE "CloseOutcome" AS ENUM ('RESOLVED', 'REDIRECTED', 'REJECTED', 'CONSULTATION_SCHEDULED');
CREATE TYPE "TicketFeedback" AS ENUM ('HELPFUL', 'NOT_HELPFUL');
CREATE TYPE "ClarificationType" AS ENUM ('REPO_LINK', 'GROUP_NUMBER', 'ERROR_SCREENSHOT', 'LESSON_TOPIC');
CREATE TYPE "TicketEventType" AS ENUM (
  'CREATED', 'ACCEPTED', 'CLARIFICATION_REQUESTED', 'CLARIFICATION_ANSWERED',
  'TEACHER_REPLIED', 'SLOTS_PROPOSED', 'SLOT_SELECTED', 'CLOSED', 'FEEDBACK_LEFT', 'REASSIGNED'
);

ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'MODERATOR';

ALTER TYPE "TicketCategory" RENAME TO "TicketCategory_old";
CREATE TYPE "TicketCategory" AS ENUM ('LAB', 'PROJECT', 'ACCESS', 'GRADING', 'RETAKE', 'OTHER');

ALTER TABLE "Ticket" ALTER COLUMN "category" TYPE "TicketCategory" USING (
  CASE "category"::text
    WHEN 'ACADEMIC' THEN 'LAB'::"TicketCategory"
    WHEN 'TECHNICAL' THEN 'ACCESS'::"TicketCategory"
    WHEN 'CAREER' THEN 'OTHER'::"TicketCategory"
    WHEN 'OTHER' THEN 'OTHER'::"TicketCategory"
    ELSE 'OTHER'::"TicketCategory"
  END
);
DROP TYPE "TicketCategory_old";

ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
CREATE TYPE "TicketStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'AWAITING_CLARIFICATION', 'SCHEDULED', 'CLOSED', 'CANCELLED');

ALTER TABLE "Ticket" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "status" TYPE "TicketStatus" USING (
  CASE "status"::text
    WHEN 'OPEN' THEN 'NEW'::"TicketStatus"
    WHEN 'IN_PROGRESS' THEN 'IN_PROGRESS'::"TicketStatus"
    WHEN 'CLOSED' THEN 'CLOSED'::"TicketStatus"
    WHEN 'CANCELLED' THEN 'CANCELLED'::"TicketStatus"
    ELSE 'NEW'::"TicketStatus"
  END
);
ALTER TABLE "Ticket" ALTER COLUMN "status" SET DEFAULT 'NEW';
DROP TYPE "TicketStatus_old";

ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "clarificationTypes" "ClarificationType"[] DEFAULT ARRAY[]::"ClarificationType"[];
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "clarificationComment" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "clarificationAnswer" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "teacherResponse" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "proposedSlots" JSONB;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "selectedSlot" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "closeOutcome" "CloseOutcome";
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "closeReason" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "feedback" "TicketFeedback";

CREATE TABLE IF NOT EXISTS "TicketEvent" (
  "id" TEXT NOT NULL,
  "ticketId" TEXT NOT NULL,
  "actorId" TEXT,
  "type" "TicketEventType" NOT NULL,
  "payload" JSONB NOT NULL DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TicketEvent_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "TicketEvent_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "TicketEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "TicketEvent_ticketId_idx" ON "TicketEvent"("ticketId");
