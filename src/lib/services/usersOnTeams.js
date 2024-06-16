import prisma from '@/lib/prisma'
import { formatUsersOnTeamsQueryParams } from '../format'
import { usersOnTeamsSchema, usersOnTeamsUpdateSchema } from '@/schemas/schemas'

export async function getAllUsersOnTeams(searchParams) {
    const formattedQueryParams = formatUsersOnTeamsQueryParams(searchParams) 
    const usersOnTeamsFound = await prisma.usersOnTeams.findMany({where:formattedQueryParams,orderBy:{teamId:'asc'},take:20})         
    return usersOnTeamsFound
}

export async function getUserOnTeamById(teamId,userId) {
    const userOnTeamFound = await prisma.usersOnTeams.findUnique({
        where: {
            teamId,userId
        }
    })
    return userOnTeamFound
}

export async function createUserOnTeam(userOnTeamData) {
    const validateBody = usersOnTeamsSchema.safeParse(userOnTeamData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data

    const newUserOnTeam = await prisma.usersOnTeams.create({ data })   
    return newUserOnTeam
}

export async function updateUserOnTeamById(teamId,userId, userOnTeamData) {
    const validateBody = usersOnTeamsUpdateSchema.safeParse(userOnTeamData)    
    if (!validateBody.success) {
        const { errors } = validateBody.error
        throw new Error("Bad body",{cause:errors})
    }
    const data = validateBody.data
    const updatedUserOnTeam = await prisma.usersOnTeams.update({
        where: {
            teamId,userId
        },
        data
    })
    return updatedUserOnTeam
}

export async function deleteUserOnTeamById(teamId,userId) {
    const deletedUserOnTeam = await prisma.usersOnTeams.delete({ where: { teamId,userId} })
    return deletedUserOnTeam
}
