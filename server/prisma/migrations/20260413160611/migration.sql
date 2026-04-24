-- CreateTable
CREATE TABLE "Brief" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "projectName" TEXT,
    "needBuilt" TEXT,
    "targetAudience" TEXT,
    "keyFeatures" TEXT,
    "avoid" TEXT,
    "deadline" TIMESTAMP(3),
    "budgetRange" TEXT,
    "references" TEXT,
    "additionalInfo" TEXT,

    CONSTRAINT "Brief_pkey" PRIMARY KEY ("id")
);
