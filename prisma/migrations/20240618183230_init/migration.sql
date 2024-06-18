-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TasksOnProjects" (
    "projectId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "creatorUserId" INTEGER,
    "assignedUserId" INTEGER,

    PRIMARY KEY ("projectId", "taskId"),
    CONSTRAINT "TasksOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TasksOnProjects_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TasksOnProjects" ("assignedUserId", "creatorUserId", "projectId", "taskId") SELECT "assignedUserId", "creatorUserId", "projectId", "taskId" FROM "TasksOnProjects";
DROP TABLE "TasksOnProjects";
ALTER TABLE "new_TasksOnProjects" RENAME TO "TasksOnProjects";
PRAGMA foreign_key_check("TasksOnProjects");
PRAGMA foreign_keys=ON;
