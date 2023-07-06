/*
  Warnings:

  - A unique constraint covering the columns `[verifyHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifyHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_verifyHash_key" ON "User"("verifyHash");
