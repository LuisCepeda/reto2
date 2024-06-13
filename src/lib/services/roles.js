import prisma from '@/lib/prisma'

export async function getAllRoles() {
    // const formattedQueryParams = formatTaskQueryParams(searchParams) 
    const rolesFound = await prisma.role.findMany()         
    return rolesFound
}