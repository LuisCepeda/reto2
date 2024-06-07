import prisma from '@/lib/prisma'
import { formatTeamsOnProjectsQueryParams } from '../format'
import { teamsOnProjectsSchema, teamsOnProjectsUpdateSchema } from '@/schemas/schemas'

export async function getAllTeamsOnProjects(searchParams) {
    const formattedQueryParams = formatTeamsOnProjectsQueryParams(searchParams) 
    const teamsOnProjectsFound = await prisma.teamsOnProjects.findMany({where:formattedQueryParams,orderBy:{createdAt:'asc'},take:20})         
    return teamsOnProjectsFound
}

export async function getTeamOnProjectById(projectId,teamId) {
    const teamOnProjectFound = await prisma.teamsOnProjects.findUnique({
        where: {
            projectId,teamId
        }
    })
    return teamOnProjectFound
}

export async function createTeamOnProject(teamOnProjectData) {
    const validateBody = teamsOnProjectsSchema.safeParse(teamOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data
    const newTeamOnProject = await prisma.teamsOnProjects.create({ data })   
    return newTeamOnProject
}

export async function updateTeamOnProjectById(projectId,teamId, teamOnProjectData) {
    const validateBody = teamsOnProjectsUpdateSchema.safeParse(teamOnProjectData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data

    const updatedTeamOnProject = await prisma.teamsOnProjects.update({
        where: {
            projectId,teamId
        },
        data
    })
    return updatedTeamOnProject
}

export async function deleteTeamOnProjectById(projectId,teamId) {
    const deletedTeamOnProject = await prisma.teamsOnProjects.delete({ where: {projectId,teamId} })
    return deletedTeamOnProject
}
