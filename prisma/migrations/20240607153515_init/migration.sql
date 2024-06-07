/*
  Warnings:

  - Added the required column `updatedAt` to the `Ecosystem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ecosystem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Ecosystem" ("createdAt", "description", "id", "latitude", "longitude", "name") SELECT "createdAt", "description", "id", "latitude", "longitude", "name" FROM "Ecosystem";
DROP TABLE "Ecosystem";
ALTER TABLE "new_Ecosystem" RENAME TO "Ecosystem";
PRAGMA foreign_key_check("Ecosystem");
PRAGMA foreign_keys=ON;
