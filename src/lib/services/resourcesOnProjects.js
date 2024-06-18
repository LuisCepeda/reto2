import prisma from '@/lib/prisma'
import { formatResourceOnProjectsQueryParams } from '../format'
import { resourcesOnProjectsSchema, resourcesOnProjectsUpdateSchema } from '@/schemas/schemas'

export async function getAllResourcesOnProjects(searchParams) {
    const formattedQueryParams = formatResourceOnProjectsQueryParams(searchParams) 
    const resourcesOnProjectsFound = await prisma.resourcesOnProjects.findMany({where:formattedQueryParams,orderBy:{projectId:'asc'},take:20})         
    return resourcesOnProjectsFound
}

export async function getResourceOnProjectById(projectId,resourceId) {
    const resourceOnProjectFound = await prisma.resourcesOnProjects.findUnique({
        where: {
            projectId_resourceId: {
                projectId: projectId,
                resourceId: resourceId
            }
        }
    })
    return resourceOnProjectFound
}

export async function createResourceOnProject(resourceOnProjectData) {
    const validateBody = resourcesOnProjectsSchema.safeParse(resourceOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data

    const newResourceOnProject = await prisma.resourcesOnProjects.create({ data })   
    return newResourceOnProject
}

export async function updateResourceOnProjectById(projectId,resourceId, resourceOnProjectData) {
    const validateBody = resourcesOnProjectsUpdateSchema.safeParse(resourceOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data
    const updatedResourceOnProject = await prisma.resourcesOnProjects.update({
        where: {
            projectId_resourceId: {
                projectId: projectId,
                resourceId: resourceId
            }
        },
        data
    })
    return updatedResourceOnProject
}

export async function deleteResourceOnProjectById(projectId,resourceId) {
    const deletedResourceOnProject = await prisma.resourcesOnProjects.delete({
        where: {
            projectId_resourceId: {
                projectId: projectId,
                resourceId: resourceId
            }
        }})
    return deletedResourceOnProject
}
