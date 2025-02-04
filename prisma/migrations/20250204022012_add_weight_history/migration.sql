-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" REAL NOT NULL,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" INTEGER NOT NULL,
    CONSTRAINT "WeightRecord_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#7C3AED',
    "initialWeight" REAL NOT NULL DEFAULT 0,
    "weightGoal" REAL NOT NULL DEFAULT 0,
    "weightLost" REAL NOT NULL DEFAULT 0,
    "moneyAdded" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Participant" ("color", "createdAt", "id", "initialWeight", "moneyAdded", "name", "photoUrl", "updatedAt", "weightGoal", "weightLost") SELECT "color", "createdAt", "id", "initialWeight", "moneyAdded", "name", "photoUrl", "updatedAt", "weightGoal", "weightLost" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
