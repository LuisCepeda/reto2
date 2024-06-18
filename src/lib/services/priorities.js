import prisma from '@/lib/prisma'

export async function getAllPriorities(searchParams) {
    const rolesFound = await prisma.priority.findMany()         
    return rolesFound
}
