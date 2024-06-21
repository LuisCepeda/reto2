import prisma from '@/lib/prisma'
import {formatSystemRolesOnUsersParams,groupByUser} from '@/lib/format'
import { systemRoleOnUsersSchema } from '@/schemas/schemas';

export async function getAllSystemRolesOnUsers(searchParams) {
    const formattedQueryParams = formatSystemRolesOnUsersParams(searchParams)
    const systemRolesOnUsersFound = await prisma.systemRolesOnUsers.findMany({ where: formattedQueryParams, orderBy: { userId: 'asc' }, include: { users: true, systemRoles: true } })

    return groupByUser(systemRolesOnUsersFound);
}

export async function createRoleOnUser(relationData) {
    
    const validateBody = systemRoleOnUsersSchema.safeParse(relationData)   
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data
    const newRoleOnUser = await prisma.systemRolesOnUsers.create({ data })
    return newRoleOnUser
}