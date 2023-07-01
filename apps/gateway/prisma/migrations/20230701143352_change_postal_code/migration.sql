/*
  Warnings:

  - You are about to drop the column `postcode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "postcode",
ADD COLUMN     "postal_code" TEXT;
