import prisma from '@/lib/prisma'
import { formatTeamsQueryParams } from '../format'
import { teamSchema,teamUpdateSchema } from '@/schemas/schemas'

export async function getAllTeams(searchParams) {
    const formattedQueryParams = formatTeamsQueryParams(searchParams) 
    const teamsFound = await prisma.team.findMany({where:formattedQueryParams,orderBy:{id:'asc'}})         
    return teamsFound
}

export async function getTeamById(id) {
    const teamFound = await prisma.team.findUnique({
        where: {
            id: id
        }
    })
    return teamFound
}

export async function createTeam(teamData) {
    const validateBody = teamSchema.safeParse(teamData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad team body",{cause:errors})
    }
    const data = validateBody.data

    const newTeam = await prisma.team.create({ data })   
    return newTeam
}

export async function updateTeamById(id, teamData) {
   const validateBody = teamUpdateSchema.safeParse(teamData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad team body",{cause:errors})
    }
    const data = validateBody.data
    const updatedTeam = await prisma.team.update({
        where: {
            id: id
        },
        data
    })
    return updatedTeam
}

export async function deleteTeamById(id) {
    const deletedTeam = await prisma.team.delete({ where: { id: id } })
    return deletedTeam
}
