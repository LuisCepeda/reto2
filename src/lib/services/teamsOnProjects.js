import prisma from '@/lib/prisma'
import { formatTeamsOnProjectsQueryParams } from '../format'
import { teamsOnProjectsSchema, teamsOnProjectsUpdateSchema } from '@/schemas/schemas'

export async function getAllTeamsOnProjects(searchParams) {
    const formattedQueryParams = formatTeamsOnProjectsQueryParams(searchParams) 
    const teamsOnProjectsFound = await prisma.teamsOnProjects.findMany({where:formattedQueryParams,orderBy:{assignedAt:'asc'}})         
    return teamsOnProjectsFound
}

export async function getTeamOnProjectById(projectId,teamId) {
    const teamOnProjectFound = await prisma.teamsOnProjects.findUnique({
        where: {
            projectId_teamId: {
                projectId: projectId,
                teamId: teamId
            }
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
            projectId_teamId: {
                projectId: projectId,
                teamId: teamId
            }
        },
        data
    })
    return updatedTeamOnProject
}

export async function deleteTeamOnProjectById(projectId,teamId) {
    const deletedTeamOnProject = await prisma.teamsOnProjects.delete({
        where: {
            projectId_teamId: {
                projectId: projectId,
                teamId: teamId
            }
        }})
    return deletedTeamOnProject
}
