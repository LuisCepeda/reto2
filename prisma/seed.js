import { projectStatusInit, systemStatusInit, resourceTypeInit, unitOfMeasureInit, systemRoleInit, teamRoleInit, priorityInit, resourceInit, ecosystemInit } from '../src/data/seedData';

import prisma from '@/lib/prisma'

async function main() {

    await prisma.ecosystem.createMany({ data: ecosystemInit })
    await prisma.priority.createMany({ data: priorityInit })
    await prisma.projectStatus.createMany({ data: projectStatusInit })
    await prisma.resourceType.createMany({ data: resourceTypeInit })
    await prisma.resource.createMany({ data: resourceInit })
    await prisma.systemRole.createMany({ data: systemRoleInit })
    await prisma.systemStatus.createMany({ data: systemStatusInit })
    await prisma.teamRole.createMany({ data: teamRoleInit })
    await prisma.unitOfMeasure.createMany({ data: unitOfMeasureInit })
    await prisma.user.create(
        {
            data: {
                "id": 1,
                "username": "admin",
                "email": "admin@admin.com",
                "password": "password123",
                "systemStatusId": 1,
                "createdAt": "2024-06-21T00:40:46.377Z",
                "updatedAt": "2024-06-21T00:40:46.377Z",
                "systemRoles": [
                    {
                        "userId": 1,
                        "systemRoleId": 1
                    }
                ]
            }
        }
    )

}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})