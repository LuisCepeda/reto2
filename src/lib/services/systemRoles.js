import prisma from '@/lib/prisma'

export async function getAllSystemRoles() {
    // const formattedQueryParams = formatTaskQueryParams(searchParams) 
    const rolesFound = await prisma.systemRole.findMany()         
    return rolesFound
}