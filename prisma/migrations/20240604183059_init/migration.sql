/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `assignedUserId` to the `TasksOnProjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorUserId` to the `TasksOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "systemStatusId" INTEGER NOT NULL,
    CONSTRAINT "Team_systemStatusId_fkey" FOREIGN KEY ("systemStatusId") REFERENCES "SystemStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UsersOnTeams" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    PRIMARY KEY ("teamId", "userId"),
    CONSTRAINT "UsersOnTeams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnTeams_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TasksOnProjects" (
    "projectId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "creatorUserId" INTEGER NOT NULL,
    "assignedUserId" INTEGER NOT NULL,

    PRIMARY KEY ("projectId", "taskId"),
    CONSTRAINT "TasksOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TasksOnProjects" ("projectId", "taskId") SELECT "projectId", "taskId" FROM "TasksOnProjects";
DROP TABLE "TasksOnProjects";
ALTER TABLE "new_TasksOnProjects" RENAME TO "TasksOnProjects";
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectStatusId" INTEGER NOT NULL,
    "priorityId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Task_projectStatusId_fkey" FOREIGN KEY ("projectStatusId") REFERENCES "ProjectStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "description", "endDate", "id", "name", "priorityId", "projectStatusId", "startDate", "updatedAt") SELECT "createdAt", "description", "endDate", "id", "name", "priorityId", "projectStatusId", "startDate", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check("TasksOnProjects");
PRAGMA foreign_key_check("Task");
PRAGMA foreign_keys=ON;
