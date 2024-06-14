import prisma from '@/lib/prisma'

export async function getAllTeamRoles() {
    // const formattedQueryParams = formatTaskQueryParams(searchParams) 
    const rolesFound = await prisma.teamRole.findMany()         
    return rolesFound
}