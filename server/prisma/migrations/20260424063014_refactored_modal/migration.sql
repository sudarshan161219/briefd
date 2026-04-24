/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Brief` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Brief` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brief" ADD COLUMN     "assetsUrls" TEXT,
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "primaryGoal" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "adminToken" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_adminToken_key" ON "User"("adminToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_email_key" ON "Client"("userId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Brief_slug_key" ON "Brief"("slug");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
