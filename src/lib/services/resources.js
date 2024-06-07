import prisma from '@/lib/prisma'
import { formatResourceQueryParams } from '../format'
import { resourceSchema, resourceUpdateSchema } from '@/schemas/schemas'

export async function getAllResources(searchParams) {
    const formattedQueryParams = formatResourceQueryParams(searchParams) 
    const resourcesFound = await prisma.resource.findMany({where:formattedQueryParams,orderBy:{id:'asc'},take:20})         
    return resourcesFound
}

export async function getResourceById(id) {
    const resourceFound = await prisma.resource.findUnique({
        where: {
            id: id
        }
    })
    return resourceFound
}

export async function createResource(resourceData) {
    const validateBody = resourceSchema.safeParse(resourceData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad resource body",{cause:errors})
    }
    const data = validateBody.data

    const newResource = await prisma.resource.create({ data })   
    return newResource
}

export async function updateResourceById(id, resourceData) {
    const validateBody = resourceUpdateSchema.safeParse(resourceData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad resource body",{cause:errors})
    }
    const data = validateBody.data

    const updatedResource = await prisma.resource.update({
        where: {
            id: id
        },
        data
    })
    return updatedResource
}

export async function deleteResourceById(id) {
    const deletedResource = await prisma.resource.delete({ where: { id: id } })
    return deletedResource
}
