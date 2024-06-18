import prisma from '@/lib/prisma'
import { formatTaskQueryParams } from '../format'
import { taskSchema ,taskUpdateSchema} from '@/schemas/schemas'

export async function getAllTasks(searchParams) {
    const formattedQueryParams = formatTaskQueryParams(searchParams) 
    const tasksFound = await prisma.task.findMany({where:formattedQueryParams,orderBy:{createdAt:'asc'},take:20})         
    return tasksFound
}

export async function getTaskById(id) {
    const taskFound = await prisma.task.findUnique({
        where: {
            id: id
        }
    })
    return taskFound
}

export async function createTask(taskData) {
    const validateBody = taskSchema.safeParse(taskData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad task body",{cause:errors})
    }
    const data = validateBody.data
    const newTask = await prisma.task.create({ data })   
    return newTask
}

export async function updateTaskById(id, taskData) {
    const validateBody = taskUpdateSchema.safeParse(taskData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        console.log('errors', errors)
        throw new Error("Bad task body",{cause:errors})
    }
    const data = validateBody.data
    const updatedTask = await prisma.task.update({
        where: {
            id: id
        },
        data
    })
    return updatedTask
}

export async function deleteTaskById(id) {
    const deletedTask = await prisma.task.delete({ where: { id: id } })
    return deletedTask
}
