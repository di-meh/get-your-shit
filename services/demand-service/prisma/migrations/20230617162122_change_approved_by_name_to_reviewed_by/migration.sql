/*
  Warnings:

  - You are about to drop the column `approvedBy` on the `Demand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "approvedBy",
ADD COLUMN     "reviewedBy" TEXT;
