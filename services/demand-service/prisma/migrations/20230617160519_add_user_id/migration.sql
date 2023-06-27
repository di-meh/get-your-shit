/*
  Warnings:

  - You are about to drop the column `email` on the `Demand` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Demand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;
