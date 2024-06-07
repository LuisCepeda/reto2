/*
  Warnings:

  - You are about to drop the column `id_system_status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_ecosystem` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `id_status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProjectStatus` table. All the data in the column will be lost.
  - Added the required column `ecosystemId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectStatusId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ProjectStatus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SystemStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Priority" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectStatusId" INTEGER NOT NULL,
    "priorityId" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "assignedTo" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TasksOnProjects" (
    "projectId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    PRIMARY KEY ("projectId", "taskId"),
    CONSTRAINT "TasksOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "systemStatusId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_systemStatusId_fkey" FOREIGN KEY ("systemStatusId") REFERENCES "SystemStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "password", "updatedAt", "username") SELECT "createdAt", "email", "id", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "progress" REAL NOT NULL,
    "projectStatusId" INTEGER NOT NULL,
    "ecosystemId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_projectStatusId_fkey" FOREIGN KEY ("projectStatusId") REFERENCES "ProjectStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_ecosystemId_fkey" FOREIGN KEY ("ecosystemId") REFERENCES "Ecosystem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "name", "progress", "updatedAt") SELECT "createdAt", "description", "id", "name", "progress", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_ProjectStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);
INSERT INTO "new_ProjectStatus" ("id") SELECT "id" FROM "ProjectStatus";
DROP TABLE "ProjectStatus";
ALTER TABLE "new_ProjectStatus" RENAME TO "ProjectStatus";
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_key_check("ProjectStatus");
PRAGMA foreign_keys=ON;
