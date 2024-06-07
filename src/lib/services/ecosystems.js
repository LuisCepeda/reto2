import prisma from '@/lib/prisma'
import { formatEcosystemQueryParams } from '../format'
import { ecosystemSchema ,ecosystemUpdateSchema} from '@/schemas/schemas'


export async function getAllEcosystems(searchParams) {
    const formattedQueryParams = formatEcosystemQueryParams(searchParams) 
    const ecosystemsFound = await prisma.ecosystem.findMany({where:formattedQueryParams,orderBy:{createdAt:'asc'},take:20})         
    return (ecosystemsFound)
}

export async function getEcosystemById(id) {
    const ecosystemFound = await prisma.ecosystem.findUnique({
        where: {
            id:id
        }
    })
    return ecosystemFound
}

export async function createEcosystem(ecosystemData) {
    const validateBody = ecosystemSchema.safeParse(ecosystemData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad ecosystem body",{cause:errors})
    }
    const data = validateBody.data
    
    const newEcosystem = await prisma.ecosystem.create({ data })   
    return (newEcosystem)
}

export async function updateEcosystemById(id,ecosystemData) {
    const validateBody = ecosystemUpdateSchema.safeParse(ecosystemData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad ecosystem body",{cause:errors})
    }
    const data = validateBody.data
    
    const updatedEcosystem = await prisma.ecosystem.update({
        where: {
            id:id
        },
        data
    })
    return updatedEcosystem
}

export async function deleteEcosystemById(id) {
    const deletedEcosystem = await prisma.ecosystem.delete({ where: { id: id } })
    return deletedEcosystem
}