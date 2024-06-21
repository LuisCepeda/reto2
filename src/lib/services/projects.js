import prisma from '@/lib/prisma'
import { formatProjectQueryParams } from '../format'
import { projectSchema, projectUpdateSchema } from '@/schemas/schemas'

export async function getAllProjects(searchParams) {
  
    const formattedQueryParams = formatProjectQueryParams(searchParams) 
    const projectsFound = await prisma.project.findMany({
        where: formattedQueryParams, orderBy: { createdAt: 'asc' },
        include: {
            teams: {
                include: {
                    team: {
                        include: {
                            users: {
                                include: {
                                    user:true
                                }
                            }
                        }
                    }
                }
            },
            tasks: {
                include: {
                    task:true
                }
            },
            resources: true,
        }
    })         
    return (projectsFound)
}

export async function getProjectById(id) {
    const projectFound = await prisma.project.findUnique({
        where: {
            id:id
        }
    })
    return projectFound
}

export async function createProject(projectData) {
    const validateBody = projectSchema.safeParse(projectData)
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad project body",{cause:errors})
    }
    const data = validateBody.data

    const newProject = await prisma.project.create({ data })   
    return (newProject)
}

export async function updateProjectById(id,projectData) {
    const validateBody = projectUpdateSchema.safeParse(projectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad project body",{cause:errors})
    }
    const data = validateBody.data
    
    const updatedProject = await prisma.project.update({
        where: {
            id:id
        },
        data
    })
    return updatedProject
}

export async function deleteProjectById(id) {
    const deletedProject = await prisma.project.delete({ where: { id: id } })
    return deletedProject
}