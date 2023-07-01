/*
  Warnings:

  - You are about to drop the column `data_birth` on the `DriverDemand` table. All the data in the column will be lost.
  - Added the required column `date_birth` to the `DriverDemand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DriverDemand" DROP COLUMN "data_birth",
ADD COLUMN     "date_birth" TIMESTAMP(3) NOT NULL;
