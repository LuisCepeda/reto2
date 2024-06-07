import prisma from '@/lib/prisma'
import { formatTasksOnProjectsQueryParams } from '../format'
import { tasksOnProjectsSchema, tasksOnProjectsUpdateSchema } from '@/schemas/schemas'

export async function getAllTasksOnProjects(searchParams) {
    const formattedQueryParams = formatTasksOnProjectsQueryParams(searchParams) 
    const tasksOnProjectsFound = await prisma.tasksOnProjects.findMany({where:formattedQueryParams,orderBy:{projectId:'asc'},take:20})         
    return tasksOnProjectsFound
}

export async function getTaskOnProjectById(projectId,taskId) {
    const taskOnProjectFound = await prisma.tasksOnProjects.findUnique({
        where: {
            projectId,taskId
        }
    })
    return taskOnProjectFound
}

export async function createTaskOnProject(taskOnProjectData) {
    const validateBody = tasksOnProjectsSchema.safeParse(taskOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data

    const newTaskOnProject = await prisma.tasksOnProjects.create({ data })   
    return newTaskOnProject
}

export async function updateTaskOnProjectById(projectId,taskId, taskOnProjectData) {
    const validateBody = tasksOnProjectsUpdateSchema.safeParse(taskOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data
    const updatedTaskOnProject = await prisma.tasksOnProjects.update({
        where: {
            projectId,taskId
        },
        data
    })
    return updatedTaskOnProject
}

export async function deleteTaskOnProjectById(projectId,taskId) {
    const deletedTaskOnProject = await prisma.tasksOnProjects.delete({ where: {projectId,taskId } })
    return deletedTaskOnProject
}
