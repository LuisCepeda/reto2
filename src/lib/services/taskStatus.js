import prisma from '@/lib/prisma'

export async function getAllTaskStatus(searchParams) {
    const rolesFound = await prisma.projectStatus.findMany()         
    return rolesFound
}
