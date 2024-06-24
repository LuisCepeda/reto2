const { projectStatusInit, systemStatusInit, resourceTypeInit, unitOfMeasureInit, systemRoleInit, teamRoleInit, priorityInit, resourceInit, ecosystemInit } = require('../src/data/seedData');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {

    // Crear ecosistemas
    await prisma.ecosystem.createMany({ data: ecosystemInit });
    console.log("Ecosistemas creados correctamente.");

    // Crear prioridades
    await prisma.priority.createMany({ data: priorityInit });
    console.log("Prioridades creadas correctamente.");

    // Crear estados de proyecto
    await prisma.projectStatus.createMany({ data: projectStatusInit });
    console.log("Estados de proyecto creados correctamente.");

    // Crear tipos de recurso
    await prisma.resourceType.createMany({ data: resourceTypeInit });
    console.log("Tipos de recurso creados correctamente.");

    // Crear roles de sistema
    await prisma.systemRole.createMany({ data: systemRoleInit });
    console.log("Roles de sistema creados correctamente.");

    // Crear estados de sistema
    await prisma.systemStatus.createMany({ data: systemStatusInit });
    console.log("Estados de sistema creados correctamente.");

    // Crear roles de equipo
    await prisma.teamRole.createMany({ data: teamRoleInit });
    console.log("Roles de equipo creados correctamente.");

    // Crear unidades de medida
    await prisma.unitOfMeasure.createMany({ data: unitOfMeasureInit });
    console.log("Unidades de medida creadas correctamente.");

    // Crear recursos
    await prisma.resource.createMany({ data: resourceInit });
    console.log("Recursos creados correctamente.");

    const hashedPassword = await bcrypt.hash("password123", 10)
    // Crear usuario
    await prisma.user.create(
        {
            data: {
                "id": 1,
                "username": "admin",
                "email": "admin@admin.com",
                "password": hashedPassword,
                "systemStatusId": 1,
                "createdAt": "2024-06-21T00:40:46.377Z",
                "updatedAt": "2024-06-21T00:40:46.377Z",
            }
        }
    )


    await prisma.systemRolesOnUsers.create({
        data: {
            userId: 1,
            systemRoleId: 1
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
