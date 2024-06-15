import prisma from '@/lib/prisma'
import {formatSystemRolesOnUsersParams,groupByUser} from '@/lib/format'

export async function getAllSystemRolesOnUsers(searchParams) {
    const formattedQueryParams = formatSystemRolesOnUsersParams(searchParams)
    const systemRolesOnUsersFound = await prisma.systemRolesOnUsers.findMany({ where: formattedQueryParams, orderBy: { userId: 'asc' }, take: 20, include: { users: true, systemRoles: true } })

    return groupByUser(systemRolesOnUsersFound);


}