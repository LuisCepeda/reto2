/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `roleId` on the `UsersOnTeams` table. All the data in the column will be lost.
  - Added the required column `teamRoleId` to the `UsersOnTeams` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SystemRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "SystemRolesOnUsers" (
    "userId" INTEGER NOT NULL,
    "systemRoleId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "systemRoleId"),
    CONSTRAINT "SystemRolesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SystemRolesOnUsers_systemRoleId_fkey" FOREIGN KEY ("systemRoleId") REFERENCES "SystemRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "systemStatusId" INTEGER NOT NULL DEFAULT 1,
    "systemRoleId" INTEGER NOT NULL DEFAULT 2,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_systemStatusId_fkey" FOREIGN KEY ("systemStatusId") REFERENCES "SystemStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "password", "systemStatusId", "updatedAt", "username") SELECT "createdAt", "email", "id", "password", "systemStatusId", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UsersOnTeams" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamRoleId" INTEGER NOT NULL,

    PRIMARY KEY ("teamId", "userId"),
    CONSTRAINT "UsersOnTeams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnTeams_teamRoleId_fkey" FOREIGN KEY ("teamRoleId") REFERENCES "TeamRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersOnTeams" ("teamId", "userId") SELECT "teamId", "userId" FROM "UsersOnTeams";
DROP TABLE "UsersOnTeams";
ALTER TABLE "new_UsersOnTeams" RENAME TO "UsersOnTeams";
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("UsersOnTeams");
PRAGMA foreign_keys=ON;
