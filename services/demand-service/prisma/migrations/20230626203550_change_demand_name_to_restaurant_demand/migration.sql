/*
  Warnings:

  - You are about to drop the `Demand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Demand";

-- CreateTable
CREATE TABLE "RestaurantDemand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantDemand_pkey" PRIMARY KEY ("id")
);
