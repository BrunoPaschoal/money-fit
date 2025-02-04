-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#7C3AED',
    "initialWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weightGoal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weightLost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "moneyAdded" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "WeightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyRecord" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "MoneyRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyRecord" ADD CONSTRAINT "MoneyRecord_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
