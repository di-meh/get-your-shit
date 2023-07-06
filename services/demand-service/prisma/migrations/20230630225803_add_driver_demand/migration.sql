-- CreateTable
CREATE TABLE "DriverDemand" (
    "id" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "vehicule_type" TEXT NOT NULL,
    "data_birth" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverDemand_pkey" PRIMARY KEY ("id")
);
